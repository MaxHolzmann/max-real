const router = require('express').Router();
const passport = require('passport');
const withAuth = require('../../utils/withAuth');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
    });
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate("google", {
    scope: ['profile']
}));

//redirect after logged in
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log(req.user)
    res.redirect('/todo')
})

module.exports = router;