const axios = require('axios');


/**
 * Make request to next app to revalidate the specified article. Call when pages are created or updated
 * 
 * @param {String} articleId 
 * @returns response from post request or null on failure
 */
const requestArticleRebuild = async (articleId) => {
  try {
    let requestUrl = `${process.env.NEXT_HOST}/api/revalidate?`;
    requestUrl += `secret=${process.env.NEXT_REVALIDATE_TOKEN}`;
    requestUrl += `&articleId=${articleId}`;

    const response = await axios.post(requestUrl);
    return response;
  } catch (error) {
    console.error('articlesController: requestArticleRebuild: Error encountered request revalidation:', error);
    return null;
  }
};


module.exports = { requestArticleRebuild };
