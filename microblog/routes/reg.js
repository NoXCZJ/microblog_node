var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var flash = require('connect-flash');
var User = require('../models/user')

router.get('/', function(req, res, next) {
	res.render('reg', {
		title: '用户注册',
		/*user: res.locals.user,
		success: res.locals.success,
		error: res.locals.error*/
	});
});

router.post('/', function(req, res, next) {
	//检验用户两次输入的口令是否一致
	if(req.body['password-repeat'] != req.body['password']){
		req.flash('error', '两次输入的口令不一致');
		return res.redirect('/reg');
	}
	//生成口令的散列值
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');

	var newUser = new User({
		name: req.body.username,
		password: password
	});

	//检查用户是否存在
	User.get(newUser.name, function(err, user){
		if(user){
			err = 'Username already exists.'
		}
		if(err){
			req.flash('error', err);
			return res.redirect('/reg');
		}
		//如果不存在则新增用户
		newUser.save(function(err){
			if(err){
				req.flash('error', err);
				return res.redirect('/reg');
			}
			req.session.user = newUser;
			req.flash('success', '注册成功');
			res.redirect('/');
		});
	});

});

module.exports = router;