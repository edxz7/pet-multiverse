const express = require('express');
const userRouter = express.Router();
const { 
    getSignup,
    postSignup,
    profile
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


/**
 * Logout
 */


module.exports = userRouter;