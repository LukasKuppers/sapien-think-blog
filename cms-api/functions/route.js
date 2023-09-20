const { Router } = require('express');
const articlesController = require('./controllers/articlesController');


// init
const router = Router();

// routes
router.get('/articles', articlesController.getAllArticles);


module.exports = router;
