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


module.exports = {
  getAllArticles
};
