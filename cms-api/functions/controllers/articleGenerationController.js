const logger = require('firebase-functions/logger');

const { getTopKeyword, markTopKeywordAsComplete } = require('../util/remoteKeywords');
const { generateArticleContent, generateArticleSubtitle, generateArticleImageSearchTerm } = require('../util/openai');


/**
 * Top-level function to generate and upload a new article
 */
const generateArticle = () => {
  logger.info('[articleGenerationController] Processing request to generate new article');

  getTopKeyword()
    .then(async (keywordData) => {
      logger.debug(`Receieved keyword from airtable: ${keywordData.keyword} id: ${keywordData.id}`);

      const subtitle = await generateArticleSubtitle(keywordData.keyword);
      const searchTerm = await generateArticleImageSearchTerm(keywordData.keyword);

      logger.debug(`Receieved article data: subtitle: ${subtitle}, search term: ${searchTerm}`);
    });
};


module.exports = { generateArticle };
