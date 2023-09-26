const logger = require('firebase-functions/logger');

const { getAllTableData, updateRecord } = require('./airtable');

const BASE_ID = 'app9vAZn1T7YBq027';
const TABLE_ID = 'tbl7CnjcIArSJU3vj';
const STATUS_DONE = 'done';
const STATUS_IGNORE = 'ignore';


/**
 * Get top pending keyword from keywords google sheet.
 * Keywords with status done or ignore are not considered.
 * @returns Object with keys: 
 * - keyword: the actual value of the keyword to be used in article generation
 * - id: the id of the record the keyword came from
 */
const getTopKeyword = async () => {
  const rows = await getAllTableData(BASE_ID, TABLE_ID);
  if (!rows || rows.length === 0) {
    logger.error('remoteKeywords.js: getTopKeyword: Table is non-existent or empty.');
    return '';
  }

  // loop through rows until keyword is found that doesn't have status done or ignore.
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    // ignore row if keyword is empty
    if (!row.data.hasOwnProperty('keyword') || row.data.keyword === '') {
      continue;
    }

    const status = row.data.status.toLowerCase();
    if (status !== STATUS_DONE && status !== STATUS_IGNORE) {
      // valid keyword, return it
      return {
        keyword: row.data.keyword, 
        id: row.id
      };
    }
  }
};


/**
 * Mark keyword in airtable as done - so it will not be regenerated
 * 
 * @param {String} recordId - recordId for the keyword
 */
const markTopKeywordAsComplete = async (recordId) => {
  const newData = {
    status: STATUS_DONE
  };

  const success = await updateRecord(BASE_ID, TABLE_ID, recordId, newData);
  return success;
};


module.exports = {
  getTopKeyword, 
  markTopKeywordAsComplete
};
