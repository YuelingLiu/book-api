const express = require('express');
const router = express.Router();
const booksController = require('../controllers/book');

// http request
router.get('/', booksController.getAllBooks);

module.exports = router;
