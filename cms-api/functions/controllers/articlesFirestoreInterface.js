const logger = require('firebase-functions/logger');

const admin = require('../admin');

const COLLECTION = 'articles'


/**
 * Gets list of all articles in the database
 * 
 * @returns array of article metadata, in form specified in API docs. 
 */
const getArticlesList = async (tags) => {
  logger.info('[articlesFirestoreInterface] Getting article list.');

  const db = admin.firestore();
  const articlesRef = db.collection(COLLECTION);
  let articleSnapshots = [];

  // query firebase for all articles
  try {
    if (tags) {
      // convert query tags to lower case
      tags = tags.map(tag => tag.toLowerCase());

      logger.info(`[articlesFirestoreInterface] Filtering articles for tags: ${JSON.stringify(tags)}`)
      // filter tags exist: only get articles with at least one matching tag
      const articleRefs = await articlesRef.where('tags', 'array-contains-any', tags).get();
      articleSnapshots = articleRefs.docs;
    } else {
      // no filter tags supplied, get all articles
      const articleRefs = await articlesRef.listDocuments();
      if (articleRefs.length > 0) {
        articleSnapshots = await db.getAll(...articleRefs);
      }
    }
  } catch (error) {
    logger.error('[articlesFirestoreInterface] getArticlesList: error encountered querying firestore:', error);
    return [];
  }

  // filter out non-existant articles and format output
  const formattedArticleList = articleSnapshots
    .filter((article) => article.exists)
    .map((article) => {
      const data = article.data();
      const thumbnail_link = data.hasOwnProperty('image') ? data.image.thumbnail_link : undefined;
      return {
        params: {
          id: article.id, 
          title: data.metadata.title, 
          date: data.metadata.date, 
          subtitle: data.metadata.subtitle, 
          thumbnail_link: thumbnail_link
        }
      };
    });
  
  return formattedArticleList
};


/**
 * Gets all article data for a specific article, if it exists.
 * 
 * @param {String} articleId 
 * @returns null on error, or article data in format specified in API docs.
 */
const getArticle = async (articleId) => {
  logger.info(`[articlesFirestoreInterface] Getting article with id: ${articleId}.`);

  const db = admin.firestore();
  const articleRef = db.collection(COLLECTION).doc(articleId);
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
  return articleData;
};


/**
 * Creates or updates an article document in firestore.
 * 
 * @param {Object} articleData - object containing article data - assumed to be in correct form. See API docs.
 * @returns true iff document creation/update was successful.
 */
const createArticle = async (articleData) => {
  logger.info('[articlesFirestoreInterface] Creating or updating article content.');
  // assumes that input data is properly formatted
  
  articleData.metadata.date = Date.now();

  // create or update document
  const db = admin.firestore();

  try {
    await db.collection(COLLECTION)
      .doc(articleData.metadata.id)
      .set(articleData);
  } catch (error) {
    logger.error('[articlesFirestoreInterface] createArticle: error encountered when writing document:', error);
    return false;
  }
  
  return true;
};


/**
 * Deletes an article document in firestore.
 * 
 * @param {String} articleId 
 * @returns true iff document deletion was successful.
 */
const deleteArticle = async (articleId) => {
  logger.info(`[articlesFirestoreInterface] Deleting article with id: ${articleId}.`);

  const db = admin.firestore();
  const articleRef = db.collection(COLLECTION).doc(articleId);
  
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
