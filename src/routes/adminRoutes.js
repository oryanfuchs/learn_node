var express = require('express');
var adminRouther = express.Router();
var mongodb = require('mongodb').MongoClient;
var books = [{title: 'test-title', author: 'my-author'}, {title: 'test-title2', author: 'my-author2'}];

var router = function () {

    adminRouther.route('/addBooks')
        .get(function (req,res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, client) {

                const db = client.db('libraryApp'); //db name

                var collection = db.collection('books');
                collection.insertMany(books,
                    function (err,results) {
                        res.send(results);
                        client.close()
                    })
            });

        });
    return adminRouther;

}
module.exports = router;


