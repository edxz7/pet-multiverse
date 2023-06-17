const express = require('express');
const userRouter = express.Router();
const { 
    getSignup,
    postSignup,
    getProfile,
    getLogin,
    postLogin
} = require('../controllers/auth.controller')

/**
 * Signup
 */
userRouter.get('/signup', getSignup)

userRouter.post('/signup', postSignup)

/**
 * Profile
 */
userRouter.get('/profile', getProfile)

/**
 * Login
 */

userRouter.get('/login', getLogin)
userRouter.post('/login', postLogin )


/**
 * Logout
 */


module.exports = userRouter;