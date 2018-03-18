var express = require('express');
var authRouther = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function () {
    
    authRouther.route('/signUp')
        .post(function (req,res) {
            console.log(req.body);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, client) {

                const db = client.db('libraryApp'); //db name

                var collection = db.collection('users');
                var user = {
                    username: req.body.userName,
                    password : req.body.password
                };
                collection.insert(user,
                    function (err, results){
                        req.login(results.ops[0], function () {
                            res.redirect('/auth/profile');
                        })
                    })
            });
        });
    authRouther.route('/signIn')
        .post(passport.authenticate('local',{
            failureRedirect: '/'
        }),function (req,res) {
            res.redirect('/auth/profile');
        })
    authRouther.route('/profile')
        .all(function (req,res,next) {
            if(!req.user){
                res.redirect('/')
            }
            next();

        })
        .get(function (req,res) {
            res.json(req.user);

        })
    return authRouther
}

module.exports = router;