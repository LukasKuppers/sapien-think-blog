const axios = require('axios');

const PROD_ENV_NAME = 'prod';


/**
 * Gets list of all sorted articles (by date desc)
 * returns list in form:
 * [{ params: { id, title, subtitle, date, thumbnail } }]
 * Note: subtitle and thumbnial may not be present in all posts
 */
export async function getAllArticleIds() {
  const url = getCmsUrl('/api/articles');

  try {
    const res = await axios.get(url);
    const resData = res.data;
    return resData.articles;
  } catch(error) {
    console.error('articles.js: getAllArticleIds(): Error encountered fetching list:', error);
    return [];
  }
}


export async function getArticleData(articleId) {
  const url = getCmsUrl(`/api/articles/${articleId}`);

  try {
    const res = await axios.get(url);
    const resData = res.data;
    return resData;
  } catch (error) {
    console.error('articles.js: getArticleData(): Error encountered fetching article:', error);
    return {};
  }
}


// expects routes to start with '/'
const getCmsUrl = (route) => {
  // use https when accessing production api
  const prefix = process.env.ENV === PROD_ENV_NAME ? 'https://' : 'http://'; 
  return `${prefix}${process.env.CMS_API_HOST}${route}`;
};
