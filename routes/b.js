/**
 * Created by jacktong on 2018/8/19.
 */
var express = require('express');
var router = express.Router();
var app  =  express();

router.get('/', function(req, res, next) {
    res.render('app/b/view/login', { title: '' });
});

module.exports = router;
