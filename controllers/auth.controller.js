const User = require('../models/User.model');

/**
 * Signup
 */

// GET
const getSignup = (req, res) => {
    res.render('auth/signup')
}

// POST
const postSignup = async (req, res) => {
    
}


/**
 * profile
 */
const getProfile = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const { username, email, } = await User.findById(userId)
        res.render('user/profile', { username, email })
    } catch (error) {
        next(error)
    }

}

/**
 * Login
 */

const getLogin = (req, res) => {
    res.render('auth/login')
}


/**
 * Logout
 */


module.exports = {
    getSignup,
    postSignup,
    getProfile,
    getLogin
}