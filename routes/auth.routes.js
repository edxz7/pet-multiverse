const express = require('express');
const userRouter = express.Router();
const { 
    getSignup,
    postSignup,
    getProfile,
    getLogin,
    postLogin
} = require('../controllers/auth.controller')
const { isLoggedIn, isLoggedOut } = require('../middlewares/guard-auth.middleware');
/**
 * Signup
 */
userRouter.get('/signup', isLoggedOut, getSignup)

userRouter.post('/signup', postSignup)

/**
 * Profile
 */
userRouter.get('/profile', isLoggedIn, getProfile)

/**
 * Login
 */

userRouter.get('/login', isLoggedOut, getLogin)
userRouter.post('/login', postLogin )


/**
 * Logout
 */


userRouter.get('/logout', isLoggedIn, (req, res, next) => {
    req.session.destroy((error) => {
        if(error) {
            return next(error)
        }
        console.log('req.session: ', req.session);
        res.redirect('/')
    })
})


module.exports = userRouter;