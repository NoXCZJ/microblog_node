//user.js
var express = require('express');
var router = express.Router();

router.get('/:user', function(req, res, next){
	res.render('index', {
		title: req.params.user
	});
});

module.exports = router;