const logger = require('firebase-functions/logger');
const axios = require('axios');


/**
 * Gets all data from a google sheet
 * 
 * @param {String} sheetId - the Google Sheet ID 
 * @param {String} sheetName - the name of the specific sheet 
 * @returns array of arrays (each innter array is a separate row)
 */
const getAllSheetsData = async (sheetId, sheetName) => {
  const sheetData = await getSpecificSheetsData(sheetId, sheetName, '');
  return sheetData;
};


/**
 * Gets data from a google sheet in a specific range
 * 
 * @param {String} sheetId - the Google Sheet ID 
 * @param {String} sheetName - the name of the specific sheet 
 * @param {String} dataRange - the cells to query in form A1:B2 
 * @returns array of arrays (each inner array is a separate row)
 */
const getSpecificSheetsData = async (sheetId, sheetName, dataRange) => {
  const queryUrl = generateSheetsUrl(sheetId, sheetName, dataRange);
  
  try {
    const response = await axios.get(queryUrl);
    return response.data.values;
  } catch (error) {
    logger.error('gsheets.js: getSheetsData: Encountered error when fetching data from API:', error);
    return [];
  }
};


/**
 * Sets specific cell in specified google sheet
 * 
 * @param {String} sheetId - The Google Sheet ID
 * @param {String} sheetName - the name of the specific sheet
 * @param {String} cell - the name of the cell to edit
 * @param {String} cell - the value to insert into the cell
 * @returns true iff the request was successful
 */
const setSheetCell = async (sheetId, sheetName, cell, newValue) => {
  const queryUrl = generateSheetsUrl(sheetId, sheetName, cell);
  const requestBody = {
    values: [[newValue]]
  };

  try {
    await axios.put(queryUrl, requestBody);
    return true;
  } catch (error) {
    logger.error('gsheets.js: setSheetCell: Encountered error when setting cell value:', error);
    return false;
  }
};


const generateSheetsUrl = (sheetId, sheetName, dataRange) => {
  const apiKey = process.env.GSHEETS_API_KEY;

  const baseUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values`;
  const fullUrl = dataRange !== '' ? 
    `${baseUrl}/${sheetName}!${dataRange}?key=${apiKey}` :
    `${baseUrl}/${sheetName}?key=${apiKey}`;  
  
  return fullUrl;
};


module.exports = { 
  getAllSheetsData, 
  getSpecificSheetsData, 
  setSheetCell
};
