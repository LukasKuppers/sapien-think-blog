const axios = require('axios');
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';


const PROD_ENV_NAME = 'prod';


/**
 * Gets list of all sorted articles (by date desc)
 * @returns List in form:
 * [{ params: { id, title, subtitle <optional>, date, thumbnail_link <optional> } }]
 * > Note: subtitle and thumbnial may not be present in all posts
 */
export async function getAllArticleIds() {
  const url = getCmsUrl('/api/articles');

  try {
    const headers = {
      'api-key': process.env.CMS_API_KEY
    };
    const res = await axios.get(url, { headers });
    const resData = res.data;
    return resData.articles;
  } catch(error) {
    console.error('articles.js: getAllArticleIds(): Error encountered fetching list:', error);
    return [];
  }
}


/**
 * Gets complete article data corresponding to provided ID
 * @param {String} articleId - unique ID of article 
 * @returns object containing article data - id, title, date, and content are garunteed
 */
export async function getArticleData(articleId) {
  const url = getCmsUrl(`/api/articles/${articleId}`);

  try {
    const headers = {
      'api-key': process.env.CMS_API_KEY
    };
    const res = await axios.get(url, { headers });
    const resData = res.data;

    const markdownString = resData.content;

    // convert markdown to html
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(markdownString);
    
    // required fields:
    let outputData = {
      id: resData.metadata.id, 
      title: resData.metadata.title, 
      date: resData.metadata.date, 
      content: processedContent.toString()
    };

    // optional fields:
    if (resData.hasOwnProperty('image')) {
      outputData.image = resData.image;
    }
    if (resData.metadata.hasOwnProperty('subtitle')) {
      outputData.subtitle = resData.metadata.subtitle;
    }
    
    return outputData;
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
