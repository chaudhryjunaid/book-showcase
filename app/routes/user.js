var express = require('express');
var user = require('../controllers/user');
var router = express.Router();

router.get('/', user.index);

module.exports = router;
