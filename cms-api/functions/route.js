const { Router } = require('express');
const articlesController = require('./controllers/articlesController');


// init
const router = Router();

// routes
router.get('/articles', articlesController.getAllArticles);
router.get('/articles/:id', articlesController.getArticle);
router.post('/articles', articlesController.createArticle);
router.delete('/articles/:id', articlesController.deleteArticle);


module.exports = router;
