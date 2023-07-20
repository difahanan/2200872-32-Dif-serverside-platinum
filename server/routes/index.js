var express = require('express');
const { MainController } = require('../controllers/MainController')
var router = express.Router();
var passport = require('../lib/passport')

const { PassportMainController } = require('../controllers/PassportMainController')
const { PassportAuthorizationCheck } = require('../lib/PassportAuthorizationCheck');
const { LandingPageController } = require('../controllers/LandingPageController');


/* REGISTER PAGE */
router.get('/register', PassportMainController.getRegisterPage)
router.post('/register', PassportMainController.postRegisterPage)

/* LOGIN PAGE */
router.get('/login', PassportMainController.getLoginPage);
// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/login',
//     failureFlash: true
// }))

router.post('/login', passport.authenticate('local', 
    {
        failureRedirect: '/login',
        failureFlash: true
    })
    , function(req, res) {
        console.log(req.user)
        res.status(200).json({message: "success"})
    }
)



router.get('/gamelist/get', MainController.getGameList)


/* data utk komponen landingpage */
router.get('/gamelist/trending', LandingPageController.trendingGames);
router.get('/gamelist/popular', LandingPageController.popularGames);
router.get('/gamelist/comingsoon', LandingPageController.comingSoonGames);
router.get('/player/leaderboard', LandingPageController.playerLeaderboard);
router.get('/player/community', LandingPageController.playerCommunity);


module.exports = router;
