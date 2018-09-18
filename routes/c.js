var express = require('express');
var router = express.Router();
var app  =  express();

router.get('/', function(req, res, next) {
    res.render('app/c/view/check_frame', { code:req.query.code});
});

router.get('/frame', function(req, res, next) {
    res.render('app/c/view/frame', { title: '' });
});

module.exports = router;
