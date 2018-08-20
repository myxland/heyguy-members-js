var express = require('express');
var router = express.Router();
var app  =  express();

router.get('/', function(req, res, next) {
    res.render('app/c/view/index', { title: '' });
});

module.exports = router;
