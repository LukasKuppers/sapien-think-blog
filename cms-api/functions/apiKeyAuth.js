const logger = require('firebase-functions/logger');

const API_KEY_HEADER = 'api-key';


// overall function to manage api key auth
// since this isn't a public api, only one api key is needed (stored as secret)
const authenticateAPIKey = async (req, res, next) => {
  const apiKey = req.get(API_KEY_HEADER);
  if (!apiKey || apiKey !== process.env.API_KEY) {
    logger.info('Authentication Error: API key is invalid');
    res.status(401).json({
      error: 'unauthorized. Provide valid api key in api-key header.'
    });
  } else {
    logger.info('API key authentication success: Provided key is valid.');
    next();
  }
};


module.exports = authenticateAPIKey;
