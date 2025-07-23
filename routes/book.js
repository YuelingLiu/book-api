const express = require('express');
const router = express.Router();
const booksController = require('../controllers/book');

// http request
router.get('/', booksController.getAllBooks);

// to delete a book by id
router.delete('/:id', booksController.deleteBook);

module.exports = router;
