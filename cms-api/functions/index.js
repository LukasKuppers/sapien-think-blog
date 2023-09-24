const functions = require('firebase-functions');
const express = require('express');

const router = require('./route');
const authenticateAPIKey = require('./apiKeyAuth');


// init
const app = express();

app.use(authenticateAPIKey);

app.use('/api', router);


exports.app = functions
  .runWith({ secrets: ['NEXT_REVALIDATE_TOKEN', 'API_KEY'] })
  .https.onRequest(app);
