const functions = require('firebase-functions');
const express = require('express');

const router = require('./route');


// init
const app = express();

app.use('/api', router);


exports.app = functions
  .runWith({ secrets: ['NEXT_REVALIDATE_TOKEN'] })
  .https.onRequest(app);
