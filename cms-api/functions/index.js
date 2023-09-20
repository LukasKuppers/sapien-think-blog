const functions = require('firebase-functions');
const express = require('express');

const router = require('./route');


// init
const app = express();

app.use('/api', router);


exports.app = functions.https.onRequest(app);
