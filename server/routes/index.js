var express = require('express');
const { MainController } = require('../controllers/MainController')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/gamelist/get', MainController.getGameList)

module.exports = router;
