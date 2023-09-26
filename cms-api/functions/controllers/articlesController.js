const logger = require('firebase-functions/logger');

const articlesDb = require('./articlesFirestoreInterface');
const { requestArticleRebuild } = require('../util/nextAppRevalidate');


const getAllArticles = (req, res) => {
  logger.info('Processing request at GET /api/articles: Getting list of metadata for all articles.');

  articlesDb.getArticlesList()
    .then((articles) => {
      res.status(200).json({ articles: articles });
    });
};


const getArticle = (req, res) => {
  const id = req.params.id;
  logger.info(`Processing request at GET /api/articles/{id}: Getting article with id: ${id}.`);

  articlesDb.getArticle(id)
    .then((articleData) => {
      if (!articleData) {
        res.status(404).json({
          message: `No article with id: ${id} was found.`
        });
      } else {
        res.status(200).json(articleData);
      }
    });
};


const createArticle = (req, res) => {
  logger.info('Processing request at POST /api/articles: Creating or updating article content.');
  
  // enforce request format
  const reqBody = req.body;
  if (!reqBody.hasOwnProperty('metadata') || !reqBody.hasOwnProperty('content')) {
    return res.status(400).json({
      error: 'Request body is missing required fields: "metadata" and "content" must be included.'
    });
  }

  // check required fields in metadata
  if (!reqBody.metadata.hasOwnProperty('id') || !reqBody.metadata.hasOwnProperty('title')) {
    return res.status(400).json({
      error: 'Request metadata is missing required fields: "id" and "title" must be included.'
    });
  }

  // check required fields in image
  if (reqBody.hasOwnProperty('image')) {
    if (!reqBody.image.hasOwnProperty('regular_link') || !reqBody.image.hasOwnProperty('thumbnail_link') ||
        !reqBody.image.hasOwnProperty('alt_text') || !reqBody.image.hasOwnProperty('download_link') ||
        !reqBody.image.hasOwnProperty('photographer_username') || !reqBody.image.hasOwnProperty('photographer_name'))
    {
      return res.status(400).json({
        error: 'Request image is missing required fields: see API docs for more info.'
      });
    }
  }

  // create/update document
  articlesDb.createArticle(reqBody)
    .then((success) => {
      if (success) {
        res.status(201).json({
          message: 'Article data upload success.'
        });

        requestArticleRebuild(reqBody.metadata.id);
      } else {
        res.status(500).json({
          error: 'Internal error encountered while uploading article data.'
        });
      }
    });
};


const deleteArticle = (req, res) => {
  const id = req.params.id;
  logger.info(`Processing request at DELETE /api/articles/{id}: Deleting article with id: ${id}.`);

  articlesDb.deleteArticle(id)
    .then((success) => {
      if (success) {
        res.status(200).json({
          message: `article with id: ${id} successfully deleted.`
        });
      } else {
        res.status(500).json({
          error: 'an internal server error occured.'
        });
      }
    });
}


module.exports = {
  getAllArticles, 
  getArticle, 
  createArticle, 
  deleteArticle
};
