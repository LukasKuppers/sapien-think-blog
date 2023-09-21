const logger = require('firebase-functions/logger');

const admin = require('../admin');

const DATA_KEY = 'data';
const ID_KEY = 'id';
const TITLE_KEY = 'title';
const SUBTITLE_KEY = 'subtitle';
const THUMBNAIL_KEY = 'thumbnail';
const CONTENT_KEY = 'content';


const getAllArticles = (req, res) => {
  logger.info('Processing request at GET /api/articles: Getting list of metadata for all articles');

  const db = admin.firestore();
  const articlesRef = db.collection('articles');

  // query firebase for all articles
  articlesRef.listDocuments()
    .then((articleRefs) => {
      return db.getAll(...articleRefs);
    })
    .then((articleSnapshots) => {
      // filter out non-extant articles and format output list
      const formattedArticleList = articleSnapshots
        .filter((article) => article.exists)
        .map((article) => {
          const metadata = article.data();
          return {
            params: {
              id: article.id, 
              title: metadata.title, 
              date: metadata.date, 
              subtitle: metadata.subtitle, 
              thumbnail: metadata.thumbnail
            }
          };
        });

      res.status(200).json({articles: formattedArticleList});
    });
};


const getArticle = (req, res) => {
  const id = req.params.id;
  logger.info(`Processing request at GET /api/articles/{id}: Getting article with id: ${id}`);

  const db = admin.firestore();
  const articleRef = db.collection('articles').doc(id);
  articleRef.get()
    .then((articleSnapshot) => {
      // check if article exists
      if (!articleSnapshot.exists) {
        res.status(404).json({
          message: `No article with id: ${id} was found`
        });
        return;
      }

      // article exists, return it to user
      const articleData = articleSnapshot.data();
      const resJson = {
        data: {
          id: id, 
          title: articleData.title, 
          date: articleData.date, 
          subtitle: articleData.subtitle, 
          thumbnail: articleData.thumbnail
        }, 
        content: articleData.content
      };
      res.status(400).json(resJson);
    });
};


const createArticle = (req, res) => {
  logger.info('Processing request at POST /api/articles: Creating or updating article content');
  
  // error handling
  const reqBody = req.body;
  if (!reqBody || !reqBody.hasOwnProperty(DATA_KEY) || !reqBody.hasOwnProperty(CONTENT_KEY)) {
    res.status(400).json({
      error: 'malformed request body. Ensure requried properties are included.'
    });
  }

  const metadata = reqBody[DATA_KEY];
  if (!metadata.hasOwnProperty(ID_KEY) || !metadata.hasOwnProperty(TITLE_KEY)) {
    res.status(400).json({
      error: 'malformed request body. "data" object is missing required properties.'
    });
  }

  // assemble document data
  let docData = {
    title: metadata[TITLE_KEY], 
    content: reqBody[CONTENT_KEY], 
    date: Date.now()
  };

  if (metadata.hasOwnProperty(SUBTITLE_KEY)) {
    docData.subtitle = metadata[SUBTITLE_KEY]
  }
  if (metadata.hasOwnProperty(THUMBNAIL_KEY)) {
    docData.thumbnail = metadata[THUMBNAIL_KEY]
  }

  // create or update document
  const db = admin.firestore();
  db.collection('articles')
    .doc(metadata[ID_KEY])
    .set(docData)
    .then(() => {
      res.status(201).json({
        'message': 'article successfully uploaded.'
      });
    });
};


const deleteArticle = (req, res) => {
  const id = req.params.id;

  logger.info(`Deleting article with id: ${id}`);
  res.status(204);
}


module.exports = {
  getAllArticles, 
  getArticle, 
  createArticle, 
  deleteArticle
};
