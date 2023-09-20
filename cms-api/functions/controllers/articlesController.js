const logger = require('firebase-functions/logger');


const getAllArticles = (req, res) => {
  const resJson = {
    articles: [
      'article1', 
      'article2', 
      'article3'
    ]
  };

  logger.info('Responding to request for all articles');
  res.json(resJson);
};


const getArticle = (req, res) => {
  const id = req.params.id;

  logger.info ('responding to request for specific article');
  res.json({
    message: `Requested article with id: ${id}`
  });
};


const createArticle = (req, res) => {
  logger.info('Creating article');
  res.status(201);
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
