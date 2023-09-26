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
  const requestHeaders = {
    'Content-Type': 'application/json', 
    Authorization: `Bearer ${API_KEY}`
  };

  const messages = generateRequestMessages(articleTitle);
  const requestBody = {
    model: CHAT_MODEL, 
    messages: messages, 
    max_tokens: 1500
  };

  const response = await axios.post(API_URL, requestBody, { headers: requestHeaders });
  const completion = response.data.choices[0];

  return completion.message.content;
};


/**
 * Generate the messages array to be used in a prompt to genereate article markdown
 * @param {String} articleTitle 
 * @returns an array of messages, in the form: [ { role: <role>, content: <msg> }, ... ]
 */
const generateRequestMessages = (articleTitle) => {
  const SYS_MSG = 'You write academic articles for a philosophy blog';
  const USR_MSG = `Write an article for a philosophy blog with the title '${articleTitle}'. The article should be written in standard markdown format. The article should be about ${APROX_LENGTH} words in length. Make sure to reference official sources (such as books). Include a references section at the end of the article.`;

  return [
    { role: 'system', content: SYS_MSG }, 
    { role: 'user', content: USR_MSG }
  ];
};


module.exports = {
  generateArticleContent
};
