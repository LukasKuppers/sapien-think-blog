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


/**
 * Given an HTML string, gets the content of a list under a specific heading (tag).
 *  
 * @param {String} htmlString - valid HTML content in string format 
 * @param {String} targetTag - the tag of the heading element to target.
 * @param {String} targetText - the value of the heading element to target.
 * @param {Optional} fallbackTags - optional array of target tags to try if target tag doesnt match
 * @returns An array of strings, each string corresponding to the entire contiguous text on one list item.
 */
const getListUnderTag = (htmlString, targetTag, targetText, fallbackTags) => {
  const $ = cheerio.load(htmlString);

  // find target element
  let targetElement = $(`${targetTag}:contains("${targetText}")`);

  if (fallbackTags) {
    // if target doesnt get an element, try fallback tags (if they exist)
    let fallbackTagIndex = 0;
    while (!targetElement.length && fallbackTagIndex < fallbackTags.length) {
      const fallbackTag = fallbackTags[fallbackTagIndex];
      targetElement = $(`${fallbackTag}:contains("${targetText}")`);
      fallbackTagIndex++;
    }
  }

  if (!targetElement.length) {
    // if target doesnt exist, return empty array
    return [];
  }

  const $list = targetElement.next().find('li');

  const list = [];
  $list.each((index, item) => {
    const listItemText = $(item).text();
    list.push(listItemText);
  });

  return list;
};


module.exports = {
  removeAllAboveElement, 
  getListUnderTag
};
