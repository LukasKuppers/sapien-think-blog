const logger = require('firebase-functions/logger');

const { requestArticleRebuild } = require('../util/nextAppRevalidate')
const { createArticle } = require('./articlesFirestoreInterface');
const { getTopKeyword, markTopKeywordAsComplete } = require('../util/remoteKeywords');
const { generateArticleContent, generateArticleSubtitle, 
        generateArticleImageSearchTerm, generateArticleTags } = require('../util/openai');
const { getRandomImage } = require('../util/unsplash');


/**
 * Top-level function to generate and upload a new article
 */
const generateArticle = async () => {
  logger.info('[articleGenerationController] Processing request to generate new article.');

  const keywordData = await getTopKeyword();

  if (!keywordData) {
    logger.info('[articleGenerationController] No pending keywords exist in table. Aborting.');
    return;
  }

  const articleTitle = keywordData.keyword;
  const articleId = getIdFromTitle(articleTitle);

  const imageSearchTerm = await generateArticleImageSearchTerm(articleTitle);

  Promise.all([
    generateArticleContent(articleTitle), 
    generateArticleSubtitle(articleTitle), 
    getRandomImage(imageSearchTerm), 
    generateArticleTags(articleTitle)])
    .then(([articleContent, articleSubtitle, imgData, articleTags]) => {
      logger.info('[articleGenerationController] All article data successfully generated.');

      // format article data and request document creation in firebase
      const articleData = {
        metadata: {
          id: articleId, 
          title: articleTitle, 
          subtitle: articleSubtitle
        }, 
        tags: articleTags, 
        image: imgData, 
        content: articleContent
      };

      return createArticle(articleData);
    })
    .then((success) => {
      if (success) {
        logger.info('[articleGenerationController] document creation succeeded.');
        // request UI app to build new page
        requestArticleRebuild(articleId);
        // mark keyword as complete
        markTopKeywordAsComplete(keywordData.id);
      } else {
        logger.error('[articleGenerationController] Error encountered when creating doc in firestore.');
      }
    });
};

const getIdFromTitle = (articleTitle) => {
  let id = articleTitle.toLowerCase();
  id = id.trim();

  const charsToRemove = [":", "'", ";", ","];
  charsToRemove.forEach((char) => {
      id = id.replace(new RegExp(char, 'g'), '');
  })

  return id.replace(/ /g, '-');
};


module.exports = { generateArticle };
