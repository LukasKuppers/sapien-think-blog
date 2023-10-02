const functions = require('firebase-functions');
const express = require('express');
const logger = require('firebase-functions/logger');

const router = require('./route');
const authenticateAPIKey = require('./apiKeyAuth');
const articleGenerationController = require('./controllers/articleGenerationController');

// once per day at 12:00AM GMT (=5:00PM PST)
const ARTICLE_GENERATION_SCHEDULE = '0 0 * * *';


// init
const app = express();

app.use(authenticateAPIKey);

app.use('/api', router);


exports.app = functions
  .runWith({ secrets: ['NEXT_REVALIDATE_TOKEN', 'API_KEY'] })
  .https.onRequest(app);

exports.articleGeneration = functions
  .runWith({ secrets: ['NEXT_REVALIDATE_TOKEN'] })
  .pubsub.schedule(ARTICLE_GENERATION_SCHEDULE)
  .onRun((context) => {
    logger.info('Article generation job is being invoked on schedule.');
    articleGenerationController.generateArticle();
    return null;
  });
