var express = require('express');
var home = require('../controllers/home');
var router = express.Router();

/* GET home page. */
router.get('/', home.index);

module.exports = router;
