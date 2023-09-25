const logger = require('firebase-functions/logger');


/**
 * Top-level function to generate and upload a new article
 */
const generateArticle = () => {
  logger.info('[articleGenerationController] Processing request to generate new article');

  logger.info(`Gsheets api key: ${process.env.GSHEETS_API_KEY}`);
};


module.exports = { generateArticle };
