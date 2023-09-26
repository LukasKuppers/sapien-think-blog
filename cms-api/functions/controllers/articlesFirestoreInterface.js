const logger = require('firebase-functions/logger');

const admin = require('../admin');

const DATA_KEY = 'data';
const ID_KEY = 'id';
const TITLE_KEY = 'title';
const SUBTITLE_KEY = 'subtitle';
const THUMBNAIL_KEY = 'thumbnail';
const CONTENT_KEY = 'content';


const getArticlesList = async () => {
  logger.info('[articlesFirestoreInterface] Getting article list.');

  const db = admin.firestore();
  const articlesRef = db.collection('articles');
  let articleSnapshots = [];

  // query firebase for all articles
  try {
    const articleRefs = await articlesRef.listDocuments();
    if (articleRefs.length > 0) {
      articleSnapshots = await db.getAll(...articleRefs);
    }
  } catch (error) {
    logger.error('[articlesFirestoreInterface] getArticlesList: error encountered querying firestore:', error);
    return [];
  }

  // filter out non-existant articles and format output
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
  
  return formattedArticleList
};


const getArticle = async (articleId) => {
  logger.info(`[articlesFirestoreInterface] Getting article with id: ${articleId}.`);

  const db = admin.firestore();
  const articleRef = db.collection('articles').doc(articleId);
  let articleSnapshot;

  // query db for article record
  try {
    articleSnapshot = await articleRef.get();
  } catch (error) {
    logger.error('[articlesFirestoreInterface] getArticle: error encountered querying firestore:', error);
    return null; 
  }

  if (!articleSnapshot.exists) {
    return null;
  }

  // format output object
  const articleData = articleSnapshot.data();
  const outputData = {
    data: {
      id: articleId, 
      title: articleData.title, 
      date: articleData.date, 
      subtitle: articleData.subtitle, 
      thumbnail: articleData.thumbnail
    }, 
    content: articleData.content
  };

  return outputData;
};


const createArticle = async (articleData) => {
  logger.info('[articlesFirestoreInterface] Creating or updating article content.');
  
  // error handling
  if (!articleData || !articleData.hasOwnProperty(DATA_KEY) || !articleData.hasOwnProperty(CONTENT_KEY)) {
    return false;
  }

  const metadata = reqBody[DATA_KEY];
  if (!metadata.hasOwnProperty(ID_KEY) || !metadata.hasOwnProperty(TITLE_KEY)) {
    return false;
  }

  // assemble document data
  let docData = {
    title: metadata[TITLE_KEY], 
    content: articleData[CONTENT_KEY], 
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

  try {
    await db.collection('articles')
      .doc(metadata[ID_KEY])
      .set(docData);
  } catch (error) {
    logger.error('[articlesFirestoreInterface] createArticle: error encountered when writing document:', error);
    return false;
  }
  
  return true;
};


const deleteArticle = async (articleId) => {
  logger.info(`[articlesFirestoreInterface] Deleting article with id: ${articleId}.`);

  const db = admin.firestore();
  const articleRef = db.collection('articles').doc(articleId);
  
  try {
    await articleRef.delete();
  } catch (error) {
    logger.error('[articlesFirestoreInterface] deleteArticle: error encountered when deleting document:', error);
    return false;
  }

  return true;
};


module.exports = {
  getArticlesList, 
  getArticle, 
  createArticle, 
  deleteArticle
};
