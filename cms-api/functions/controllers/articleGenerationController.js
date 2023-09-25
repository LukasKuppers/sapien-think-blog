const logger = require('firebase-functions/logger');

const { getTopKeyword, markTopKeywordAsComplete } = require('../util/remoteKeywords');


/**
 * Top-level function to generate and upload a new article
 */
const generateArticle = () => {
  logger.info('[articleGenerationController] Processing request to generate new article');

  getTopKeyword()
    .then((keywordData) => {
      logger.debug(`Received keyword data: keyword: ${keywordData.keyword}, statusCell: ${keywordData.statusCell}`);

      markTopKeywordAsComplete(keywordData.statusCell);
    });
};


module.exports = { generateArticle };
