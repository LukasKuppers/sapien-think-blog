const logger = require('firebase-functions/logger');
const axios = require('axios');

const BASE_URL = 'https://api.unsplash.com';
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;


/**
 * Get a random image filtered by a search term
 * 
 * @param {String} searchTerm - the search term used to filter images
 * @returns And object with the following keys:
 * - regular_link: The link used to display the full image
 * - thumbnail_link: The link used to display the thumbnail image
 * - alt_text: A text description of the image
 * - download_link: Link used to trigger a download event
 * - photographer_username: Unsplash username of photographer
 * - photographer_name: Real photographer name
 */
const getRandomImage = async (searchTerm) => {
  const requestHeaders = {
    Authorization: `Client-ID ${ACCESS_KEY}`, 
    'Accept-Version': 'v1'
  };

  const queryParams = {
    query: searchTerm
  }

  const requestUrl = formatRequestUrl('/photos/random', queryParams);

  try {
    const response = await axios.get(requestUrl, { headers: requestHeaders });
    const data = response.data;
    return {
      regular_link: data.urls.regular, 
      thumbnail_link: data.urls.thumb, 
      alt_text: data.description, 
      download_link: data.links.download_location, 
      photographer_username: data.user.username, 
      photographer_name: data.user.name
    };
  } catch (error) {
    logger.error('unsplash.js: getRandomImage: Encountered error when getting image:', error);
    return {}
  }
};


const formatRequestUrl = (route, queryParams) => {
  let url = `${BASE_URL}${route}`;

  let joinChar = '?'

  for (const param in queryParams) {
    url += `${joinChar}${param}=${queryParams[param]}`;
    joinChar = '&';
  }
  return url;
}


module.exports = { getRandomImage };
