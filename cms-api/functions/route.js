const { Router } = require('express');
const articlesController = require('./controllers/articlesController');
const articleGenerationController = require('./controllers/articleGenerationController');


// init
const router = Router();

// routes
router.get('/articles', articlesController.getAllArticles);
router.get('/articles/:id', articlesController.getArticle);
router.post('/articles', articlesController.createArticle);
router.delete('/articles/:id', articlesController.deleteArticle);

// for testing article generation
router.post('/generate', (req, res) => {
  articleGenerationController.generateArticle();
  res.status(201).json({
    message: 'successfully delegated generation task to articleGenerationController'
  });
});


module.exports = router;
