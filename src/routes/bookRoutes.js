var express = require('express');
var bookRouther = express.Router();

var router = function (nav) {
    var bookService = require('../services/goodreadsService')();
    var bookController = require('../controllers/booksControllers')(bookService,nav);

    bookRouther.use(bookController.middleware)

    bookRouther.route('/')
        .get(bookController.getIndex);

    bookRouther.route('/:id')
        .get(bookController.getById);

    return bookRouther;


}


module.exports = router;