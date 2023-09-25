const logger = require('firebase-functions/logger');

const { getAllSheetsData, setSheetCell } = require('./gsheets');

const SHEET_ID = '1F2pYtyQy02kNjVr0_5ld5eP2Y2FcX_oagjwU_TRkg0U';
const SHEET_NAME = 'Sheet1';
const KEYWORDS_COL_NAME = 'keywords';
const STATUS_COL_NAME = 'status';
const STATUS_DONE = 'done';
const STATUS_IGNORE = 'ignore';


/**
 * Get top pending keyword from keywords google sheet.
 * Keywords with status done or ignore are not considered.
 * @returns Object with keys: 
 * - keyword: the actual value of the keyword to be used in article generation
 * - statusCell: a string representing the cell of the keywords status in the sheet
 */
const getTopKeyword = async () => {
  const rawData = await getAllSheetsData(SHEET_ID, SHEET_NAME);
  if (!rawData || rawData.length === 0) {
    logger.error('remoteKeywords.js: getTopKeyword: Spreadsheet is non-existent or empty.');
    return '';
  }

  // assumes first row contains header values
  const headerRow = rawData[0];
  const keywordColIndex = headerRow.indexOf(KEYWORDS_COL_NAME);
  const statusColIndex = headerRow.indexOf(STATUS_COL_NAME);
  if (keywordColIndex === -1 || statusColIndex === -1) {
    logger.error('remoteKeywords.js: getTopKeywords: Spreadsheet does not contain "keywords" or "status" headers.');
    return '';
  }

  // loop through keywords until one is found that doesn't have status done or ignore.
  const maxColIndex = Math.max(keywordColIndex, statusColIndex);
  let keyword = '';
  for (let i = 1; i < rawData.length; i++) {
    const row = rawData[i];
    // ignore row if it does not contain necessary columns
    if (row.length < maxColIndex + 1) {
      continue;
    }

    const keyword = row[keywordColIndex];
    // ignore row if keyword is empty
    if (keyword === '') {
      continue;
    }

    const status = row[statusColIndex].toLowerCase();
    if (status !== STATUS_DONE && status !== STATUS_IGNORE) {
      // valid keyword, return it
      return {
        keyword: keyword, 
        statusCell: convertCellIndexToRangeString(i, statusColIndex)
      };
    }
  }
};


/**
 * Mark keyword in google sheet as complete - so it will not be regenerated
 * 
 * @param {String} statusCell - sheet cell of the status for the keyword. Ex: "A1"
 */
const markTopKeywordAsComplete = async (statusCell) => {
  const success = await setSheetCell(SHEET_ID, SHEET_NAME, statusCell, STATUS_DONE);
  return success;
};

const convertCellIndexToRangeString = (rowIndex, colIndex) => {
  const row = rowIndex + 1;
  const col = String.fromCharCode(65 + colIndex);
  return `${col}${row}`;
};


module.exports = {
  getTopKeyword, 
  markTopKeywordAsComplete
};
