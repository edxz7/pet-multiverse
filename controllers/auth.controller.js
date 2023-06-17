const mongoose = require('mongoose');
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
/**
 * Signup
 */

// GET
const getSignup = (req, res) => {
    res.render('auth/signup')
}

// POST
const postSignup = async (req, res, next) => {
  const { username, email, password, confirmPassword }   = req.body;

  try {
    if(!username){
        return res.render('auth/signup', { errorMessage: 'El campo username es requerido' })
      }
    
      if(!email){
        return res.render('auth/signup', { errorMessage: 'El campo email es requerido' })
      }
      if(!password || !confirmPassword){
        return res.render('auth/signup', { errorMessage: 'El campo password o el campo de confirmacion de password son requeridos' })
      }


      console.log('password: ', password);
      console.log('confirmPassword: ', confirmPassword);
    
    
      if(password !== confirmPassword) {
        return  res.render('auth/signup', { errorMessage: 'Los passwords deben coincidir' })
      }


      // validamos que el email no haya sido registrado en el pasado
    //   const foundUser = await User.findOne({ email })
    //   if(foundUser) {
    //     return res.render('auth/signup', { errorMessage: 'El email ya fue registrado' })
    //   }

      // validar que el password sea seguro
      const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
      if(!regex.test(password)) {
        return res.status(400).render('auth/signup', { errorMessage: 'el password necesita tener al menos 8 caracteres, 1 letra minuscula, 1 mayuscula y 1 digito' })
      }


      // despues de validar el input del usuario, ya podemos tratar de guardarlo
      // Encriptsamos el password
      const salt = bcrypt.genSaltSync(12);
      const encryptedPassword = bcrypt.hashSync(password, salt);
      const userCreated = await User.create({ username, email, password: encryptedPassword })
      res.redirect(`/auth/profile/${userCreated._id}`)


  } catch (error) {

    // aca esperamos validar:
    // 1. que el email sea valido
    if(error instanceof mongoose.Error.ValidationError) {
        res.status(400).render('auth/signup', { errorMessage: error.message })
    } else if(error.code === 11000) {
        res.status(400).render('auth/signup', { errorMessage: 'Los campos email y username deben ser unicos' })
    }
    else {
        next(error)
    }

  }



}


/**
 * profile
 */
const getProfile = async (req, res, next) => {
    try {
        console.log('currentUser del profile: ', req.session.currentUser);
        const { username, email, } = req.session.currentUser;
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

const postLogin = async (req, res) => {
    console.log('SESSION ==> ', req.session)
    try {
        // 1. Extraemos la inoformacion del formulario que vienen en el req.body
        const { email, password } = req.body;
        // 2. Validamos que no nos envien campos vacios
        if(!email)
            return res.render('auth/login', { errorMessage: 'El campo email es requerido' } )
        if(!password)
            return res.render('auth/login', { errorMessage: 'El campo password es requerido' })
        // 3  Verficar si el correo esta registrado
        const user = await User.findOne({ email } )
        if(!user) 
            return res.render('auth/login', { errorMessage: 'El email o password son incorrectos' })
        // 4. Los passwords coinciden? 
        //           -> true | false
        const match = bcrypt.compareSync(password, user.password);
        console.log('password: ', password, 'password encriptado: ', user.password, 'match: ', match)
        if(match){
            const loggedUser = user.toObject();
            delete loggedUser.password;
            // guardamos el user en el req.session
            req.session.currentUser = loggedUser;
            return res.redirect(`/auth/profile/`)
        }
        res.render('auth/login', { errorMessage: 'El email o password son incorrectos' })
    } catch (error) {
        console.log(error);
        next(error)
    }


}


/**
 * Logout
 */


module.exports = {
    getSignup,
    postSignup,
    getProfile,
    getLogin,
    postLogin
}