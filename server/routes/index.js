const router = require('express').Router();
const passport = require('passport');
const  indexCtrl = require('../controllers/index');
const bodyParser = require('body-parser')

router.get('/',indexCtrl.index)

//Google Oauth login route
router.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']})
);

//Google Oauth callback route
router.get('/oauth2callback', passport.authenticate("google",{
    successRedirect:"/",
    failureRedirect:'/error',
})
);

//logout router
router.get("/logout", (req,res, next)=> {
    req.logout(function(err){
        if(err){
            return next(err);  }
            res.redirect("/");
    })
})

module.exports = router,
{allUsers: require("./users")};