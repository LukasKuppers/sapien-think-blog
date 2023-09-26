const logger = require('firebase-functions/logger');
const axios = require('axios');

const API_URL = 'https://api.airtable.com/v0';
const BEARER_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN;


/**
 * Gets all data from an airtable table
 * 
 * @param {String} baseId - the Airtable baseId 
 * @param {String} tableId - the Airtable tableId 
 * @returns array of objects with keys:
 * - id: record id
 * - data: object containing row data (each key is a column name)
 */
const getAllTableData = async (baseId, tableId) => {
  let response = await getRecordsWithOffset(baseId, tableId, 0);
  let records = response.records;

  while (response.hasOwnProperty('offset')) {
    const offset = response.offset;
    records = await getRecordsWithOffset(baseId, tableId, offset);

    records = records.concat(response.records)
  }

  const outputData = records.map((record) => {
    return {
      id: record.id, 
      data: record.fields
    };
  });
  return outputData;
};


/**
 * Gets records from an airtable with pagination offset
 * 
 * @param {String} baseId - the Airtable baseId
 * @param {String} tableId - the Airtable tableId
 * @param {String} offset - pagination offset
 * @returns airtable api response object with keys:
 * - offset: optional: returned if there are more more records - pass into next request offset
 * - records: array of record objects
 */
const getRecordsWithOffset = async (baseId, tableId, offset) => {
  let queryUrl = generateRequestUrl(baseId, tableId);
  queryUrl = offset !== 0 ? queryUrl + `?offset=${offset}` : queryUrl;

  const requestHeaders = {
    Authorization: `Bearer ${BEARER_TOKEN}`
  };

  try {
    const response = await axios.get(queryUrl, { headers: requestHeaders });
    return response.data;
  } catch (error) {
    logger.error('airtable.js: getRecordsWithOffset: Encountered error when fetching data from API:', error);
    return { records: [] };
  }
};


/**
 * Updates provided data for a specific record
 * 
 * @param {String} baseId - the Airtable baseId
 * @param {String} tableId - the Airtable tableId
 * @param {String} recordId - the ID of the record to update
 * @param {String} newData - Object containing columns to update and their values
 * @returns true iff the request was successful
 */
const updateRecord = async (baseId, tableId, recordId, newData) => {
  let queryUrl = generateRequestUrl(baseId, tableId);
  queryUrl += `/${recordId}`;

  const requestHeaders = {
    Authorization: `Bearer ${BEARER_TOKEN}`, 
    'Content-Type': 'application/json'
  };

  const requestBody = {
    fields: newData
  };

  try {
    await axios.patch(queryUrl, requestBody, { headers: requestHeaders });
    return true;
  } catch (error) {
    logger.error('airtable.js: updateRecord: Encountered error when setting record data:', error);
    return false;
  }
};


const generateRequestUrl = (baseId, tableId) => {
  return `${API_URL}/${baseId}/${tableId}`;
};


module.exports = { 
  getAllTableData,
  updateRecord
};
