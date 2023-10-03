const cheerio = require('cheerio');


/**
 * Given an HTML string, removes all content above an element with the maching tag and text, if it exists.
 * 
 * @param {String} htmlString - valid HTML content in string format.
 * @param {String} targetTag - the tag of the top element to target.
 * @param {String} targetText - the value of the top element to target.
 * @returns The new HTML string after applying modifications. 
 */
const removeAllAboveElement = (htmlString, targetTag, targetText) => {
  const $ = cheerio.load(htmlString);

  // find target element
  const targetElement = $(`${targetTag}:contains("${targetText}")`);

  if (targetTag.length) {
    // if target exists, remove all preceeding elements
    targetElement.prevAll().remove();
  }

  const modifiedHtml = $.html();
  return modifiedHtml;
};


module.exports = {
  removeAllAboveElement
};
