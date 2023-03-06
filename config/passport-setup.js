require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/User');

//passes the user id to the next function
passport.serializeUser((user, done) => {
    done(null, user.id)
})

//finds the user and sends it to the session
passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
        done(null, user)
    })
})

//Sets up Google Authentication
passport.use(
    new GoogleStrategy({
        //options for strategy
        callbackURL: "/auth/google/redirect",
        proxy: true,
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }, async (accessToken, refreshToken, profile, done) => {
         User.findOne({
            where: {
                google_id: profile.id
            }
        }).then((currentUser) => {
            if(currentUser) {
                console.log('already have this user')
                done(null, currentUser)
            } else {
                    User.create({
                    google_id: profile.id,
                    name: profile.displayName
                }).then((newUser) => {
                    console.log(newUser)
                    done(null, newUser)
                })
            }
        })
    }))
