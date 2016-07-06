var express = require('express');
var router = express.Router();

var users = {
	'czj': {
		name: 'mdl',
		website: 'http://www.baidu.com'
	}
};
/* GET users listing. */
router.all('/:username', function(req, res, next) {
	//检查用户是否存在
	if(users[req.params.username]){
		next();
	}else{
		next(new Error(req.params.username + 'does not exist.'));
	}
});
router.get('/:username', function(req, res, next) {
	//用户一定存在直接展示
	res.send(JSON.stringify(users[req.params.username]));
});
router.put('/:username', function(req, res, next) {
	//修改用户信息
	res.send('Done');
});

module.exports = router;
