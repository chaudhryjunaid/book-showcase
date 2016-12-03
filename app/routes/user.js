var express = require('express');
var user = require('../controllers/user');
var middlewares = { auth: require('../middlewares/auth') };
var router = express.Router();

router.post('/', user.create);
router.post('/signin', user.signin);
router.get('/signout', middlewares.auth.requiresLogin, user.signout);
router.get('/me', middlewares.auth.requiresLogin, user.me);

module.exports = router;
