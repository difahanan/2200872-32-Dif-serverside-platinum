var express = require('express');
const { MainController } = require('../controllers/MainController')
var router = express.Router();
var passport = require('../lib/passport')

const { PassportMainController } = require('../controllers/PassportMainController')
const { PassportAuthorizationCheck } = require('../lib/PassportAuthorizationCheck')


/* GET home page. */ // INI MUNGKIN BISA DI UBAH MENJADI LANDING PAGE ATAU APA GITU
router.get('/', PassportMainController.MainPage);

/* REGISTER PAGE */
router.get('/register', PassportMainController.getRegisterPage)
router.post('/register', PassportMainController.postRegisterPage)

/* LOGIN PAGE */
router.get('/login', PassportMainController.getLoginPage);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}))

/* DASHBOARD PAGE */ // KALAU TIDAK PERLU HAPUS AJA ATAU GANTI NAMANYA
router.get('/dashboard', PassportAuthorizationCheck, PassportMainController.getDashboardPage)

/* LOGOUT */ // KALAU TIDAK PERLU HAPUS AJA ATAU GANTI NAMANYA
router.post('/logout', PassportAuthorizationCheck, PassportMainController.logout)

module.exports = router;

router.get('/gamelist/get', MainController.getGameList)


