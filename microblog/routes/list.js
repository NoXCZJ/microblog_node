var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('list', {
		title: 'List',
		items: [1992, 'czj', 'express', 'Node.js']
	});
});

module.exports = router;