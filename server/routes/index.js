var express = require('express');
const { MainController } = require('../controllers/MainController')
var router = express.Router();
var passport = require('../lib/passport')

const { PassportMainController } = require('../controllers/PassportMainController')
const { PassportAuthorizationCheck } = require('../lib/PassportAuthorizationCheck');
const { LandingPageController } = require('../controllers/LandingPageController');


/* GET LANDING PAGE */ 
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


/* DASHBOARD PAGE */ 
router.get('/dashboard', PassportAuthorizationCheck, PassportMainController.getDashboardPage)

/* LOGOUT */
router.post('/logout', PassportMainController.logout)



router.get('/gamelist/get', MainController.getGameList)


/* data utk komponen landingpage */
router.get('/gamelist/trending', LandingPageController.trendingGames);
router.get('/gamelist/popular', LandingPageController.popularGames);
router.get('/gamelist/comingsoon', LandingPageController.comingSoonGames);
router.get('/player/leaderboard', LandingPageController.playerLeaderboard);
router.get('/player/community', LandingPageController.playerCommunity);


module.exports = router;
