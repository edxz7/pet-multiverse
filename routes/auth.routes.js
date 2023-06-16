const express = require('express');
const userRouter = express.Router();
const { 
    getSignup,
    postSignup,
    getProfile,
    getLogin
} = require('../controllers/auth.controller')

/**
 * Signup
 */
userRouter.get('/signup', getSignup)

userRouter.post('/signup', postSignup)

/**
 * Profile
 */
userRouter.get('/profile/:userId', getProfile)

/**
 * Login
 */

userRouter.get('/login', getLogin)



/**
 * Logout
 */


module.exports = userRouter;