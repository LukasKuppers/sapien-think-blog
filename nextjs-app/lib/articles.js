import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

import { removeAllAboveElement, getListUnderTag } from './htmlManipulation';


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
    const res = await fetch(url, { headers: headers });
    const resData = await res.json();

    // clean up text in article data
    const articles = resData.articles
      .map((article) => {
        article.params.title = formatRawText(article.params.title);
        article.params.subtitle = formatRawText(article.params.subtitle);
        return article;
      });

    return articles;
  } catch(error) {
    console.error('articles.js: getAllArticleIds(): Error encountered fetching list:', error);
    return [];
  }
}


/**
 * Gets complete article data corresponding to provided ID
 * @param {String} articleId - unique ID of article 
 * @returns object containing article data - id, title, date, references (Array), and content are garunteed
 */
export async function getArticleData(articleId) {
  const url = getCmsUrl(`/api/articles/${articleId}`);

  try {
    const headers = {
      'api-key': process.env.CMS_API_KEY
    };
    const res = await fetch(url, { headers: headers });
    const resData = await res.json();

    const markdownString = resData.content;

    // convert markdown to html
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(markdownString);

    // remove any extra content above the first intro heading
    const finalContent = removeAllAboveElement(processedContent.toString(), 'h2', 'Introduction');

    // extract references
    const references = getListUnderTag(processedContent.toString(), 'h2', 'References', ['p', 'h1', 'h3']);
    
    // required fields:
    let outputData = {
      id: resData.metadata.id, 
      title: formatRawText(resData.metadata.title), 
      date: resData.metadata.date, 
      references: references, 
      content: finalContent
    };

    // optional fields:
    if (resData.hasOwnProperty('image')) {
      outputData.image = resData.image;
    }
    if (resData.metadata.hasOwnProperty('subtitle')) {
      outputData.subtitle = formatRawText(resData.metadata.subtitle);
    }
    if (resData.hasOwnProperty('tags')) {
      outputData.tags = resData.tags;
    }
    
    return outputData;
  } catch (error) {
    console.error('articles.js: getArticleData(): Error encountered fetching article:', error);
    return {};
  }
}


/**
 * Given an array of tags, fetches related articles (with matching tags).
 * 
 * @param {Array} tags - list of strings, tags that will be used to filter related articles
 * @returns Array of related articles in form: 
 *  [{ params: { id, title, subtitle <optional>, date, thumbnail_link <optional> } }] 
 */
export async function getRelatedArticles(tags) {
  const queryParams = tags
    .map(tag => `tags[]=${tag}`)
    .join('&');
  const url = getCmsUrl(`/api/articles?${queryParams}`);

  try {
    const headers = {
      'api-key': process.env.CMS_API_KEY
    };
    const res = await fetch(url, { headers: headers });
    const resData = await res.json();

    // clean up text in article data
    const articles = resData.articles
      .map((article) => {
        article.params.title = formatRawText(article.params.title);
        article.params.subtitle = formatRawText(article.params.subtitle);
        return article;
      });

    return articles;
  } catch(error) {
    console.error('articles.js: getRelatedArticles(): Error encountered fetching list:', error);
    return [];
  }
}


// expects routes to start with '/'
const getCmsUrl = (route) => {
  // use https when accessing production api
  const prefix = process.env.ENV === PROD_ENV_NAME ? 'https://' : 'http://'; 
  return `${prefix}${process.env.CMS_API_HOST}${route}`;
};

const formatRawText = (text) => {
  let formattedText = text.trim();
  formattedText = formattedText.replace(new RegExp('"', 'g'), '');
  return formattedText;
};
