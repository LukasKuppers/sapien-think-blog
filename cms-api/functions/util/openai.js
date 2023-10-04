const axios = require('axios');

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.OPENAI_API_KEY;
const CHAT_MODEL = 'gpt-3.5-turbo';
const APROX_LENGTH = '1000';


/**
 * Generates mardown article content for given article title.
 * 
 * @param {String} articleTitle 
 * @returns markdown string containing article content
 */
const generateArticleContent = async (articleTitle) => {
  const messages = generateArticleRequestMessages(articleTitle);
  const requestBody = {
    model: CHAT_MODEL, 
    messages: messages, 
    max_tokens: 1500
  };

  const completion = await makeOpenaiChatRequest(requestBody);
  return completion.message.content;
};


/**
 * Generates a subtitle for a given article title.
 * 
 * @param {String} articleTitle 
 * @returns subtitle
 */
const generateArticleSubtitle = async (articleTitle) => {
  const messages = generateSubtitleRequestMessages(articleTitle);
  const requestBody = {
    model: CHAT_MODEL, 
    messages: messages, 
    max_tokens: 100
  };

  const completion = await makeOpenaiChatRequest(requestBody);
  return completion.message.content;
};


/**
 * Genereate a search term for a image corresponding to the article title
 * 
 * @param {String} articleTitle
 * @returns search term (String) 
 */
const generateArticleImageSearchTerm = async (articleTitle) => {
   const messages = generateImageSearchRequestMessages(articleTitle);
   const requestBody = {
    model: CHAT_MODEL, 
    messages: messages, 
    max_tokens: 20
   };

   const completion = await makeOpenaiChatRequest(requestBody);
   return completion.message.content;
};


/**
 * Generate an array of tags for an article with the given title
 * 
 * @param {String} articleTitle 
 * @returns array of strings (tags)
 */
const generateArticleTags = async (articleTitle) => {
  const messages = generateTagsRequestMessages(articleTitle);
  const request_body = {
    model: CHAT_MODEL, 
    messages: messages, 
    max_tokens: 20
  };

  const completion = await makeOpenaiChatRequest(request_body);
  const rawTags = completion.message.content;

  // convert to array of trimmed strings
  return rawTags.split(',')
    .map(tag => tag.trim());
};


/**
 * Makes a post request to the openai chat completion api.
 * 
 * @param {Object} requestBody - openai chat completion request body object 
 * @returns chat completion choice object with keys:
 * - index
 * - message: object with more keys: (role: response role, content: response content)
 * - finish_reason
 */
const makeOpenaiChatRequest = async (requestBody) => {
  const requestHeaders = {
    'Content-Type': 'application/json', 
    Authorization: `Bearer ${API_KEY}`
  };

  const response = await axios.post(API_URL, requestBody, { headers: requestHeaders });
  const completion = response.data.choices[0];
  return completion;
};


/**
 * Generate the messages array to be used in a prompt to genereate article markdown
 * @param {String} articleTitle 
 * @returns messages array
 */
const generateArticleRequestMessages = (articleTitle) => {
  const SYS_MSG = 'You write academic articles for a philosophy blog';
  const USR_MSG = `Write an article for a philosophy blog with the title '${articleTitle}'. The article should be written in standard markdown format. The article should be about ${APROX_LENGTH} words in length. Make sure to reference official sources (such as books). Include a references section at the end of the article.`;

  return formOnePromptMessages(SYS_MSG, USR_MSG);
};


/**
 * Genereate the messages array to be used in a prompt to genereate article subtitle
 * @param {String} articleTitle 
 * @returns messages array
 */
const generateSubtitleRequestMessages = (articleTitle) => {
  const SYS_MSG = 'You write academic articles for a philosophy blog';
  const USR_MSG = `Create a subtitle for an article with the title '${articleTitle}'.`;

  return formOnePromptMessages(SYS_MSG, USR_MSG);
};


/**
 * Genereate the messages array to be used in a prompt to genereate image search term
 * @param {String} articleTitle 
 * @returns messages array
 */
const generateImageSearchRequestMessages = (articleTitle) => {
  const SYS_MSG = 'You write academic articles for a philosophy blog';
  const USR_MSG = `Create a search term for an image to be placed on an article with the title '${articleTitle}'. Be creative and abstract. The search term should not include the article title.`;

  return formOnePromptMessages(SYS_MSG, USR_MSG);
};


/**
 * Generate the messages array to be used in a prompt to generate article tags
 * @param {String} articleTitle
 * @returns messages array
 */
const generateTagsRequestMessages = (articleTitle) => {
  const SYS_MSG = 'You write academic articles for a philosophy blog';
  const USR_MSG = `Suggest broad one-word tags for an article with the title '${articleTitle}'. Output should be a comma-separated list.`;

  return formOnePromptMessages(SYS_MSG, USR_MSG);
};


const formOnePromptMessages = (sysMsg, usrMsg) => {
  return [
    { role: 'system', content: sysMsg }, 
    { role: 'user', content: usrMsg }
  ];
};


module.exports = {
  generateArticleContent, 
  generateArticleSubtitle, 
  generateArticleImageSearchTerm, 
  generateArticleTags
};
