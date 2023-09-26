const logger = require('firebase-functions/logger');

const { getTopKeyword, markTopKeywordAsComplete } = require('../util/remoteKeywords');
const { generateArticleContent, generateArticleSubtitle, generateArticleImageSearchTerm } = require('../util/openai');
const { getRandomImage } = require('../util/unsplash');


/**
 * Top-level function to generate and upload a new article
 */
const generateArticle = () => {
  logger.info('[articleGenerationController] Processing request to generate new article');

  getTopKeyword()
    .then(async (keywordData) => {
      logger.debug(`Receieved keyword from airtable: ${keywordData.keyword} id: ${keywordData.id}`);

      const imgData = await getRandomImage('outer space');
      

      logger.debug(`Receieved image data: description: ${imgData.alt_text}, link: ${imgData.regular_link}`);
    });
};


module.exports = { generateArticle };
