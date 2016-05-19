var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Article = require('../models/Article');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('logIn', {
        member: null
    });
});


router.post('/', function(req, res, next) {
    Member.check(req.body.account, function(err, member) {
        if (err || req.body.password != member.password) {
            res.send('Your password is incorrect!');
        } else {
            req.session.member = member;
            res.redirect('/');
        }
    });
});

router.post('/logout', function(req, res, next) {
    req.session.member = null;
    res.redirect('/');
});


module.exports = router;
