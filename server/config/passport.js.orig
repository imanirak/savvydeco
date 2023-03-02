const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require('../models/user');


passport.use(
    new GoogleStrategy({
            
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: (process.env.NODE_ENV === 'production') ? process.env.GOOGLE_CALLBACK : process.env.LOCAL_CALLBACK
        },
        function(accessToken, refreshToken, profile, cb) {
            //a user has logged in with oauth
            console.log(profile)
            User.findOne({ googleId: profile.id }, (err, user) => {
                if (err) return cb(err);
                if (user) {
                    return cb(null, user);
                } else {
                    const newUser = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                    })
                    newUser.save(function(err) {
                        if (err) return cb(err);
                        return cb(null, newUser)
                    })
                }
            })
        })
)

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});