// checa si el usuario esta logueado (logged in) 
// este bloquea a los no logueados
const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        req.app.locals.isLoggedIn = false;
        return res.redirect('/auth/login');

      }else if (req.session.currentUser) {
          req.app.locals.isLoggedIn = true;
      } else {
          req.app.locals.isLoggedIn = false;
      }
    console.log('req.session.currentUser', req.session.currentUser);
    console.log('req.app.locals.isLoggedIn: ', req.app.locals.isLoggedIn);
    next()
}

// Este middleware sirve para protejer rutas de usuarios que
// no estan logueados, asi alguien que inicio sesion
// no puede entrar a los formularios de login y signup
// este bloquea a los usuarios logueados
const isLoggedOut = (req, res, next) => {
    if(req.session.currentUser) {
        return res.redirect('/pet')
    }
    next()
}

const isAdmin = (req, res, next) => {
    const { role } = req.session.currentUser;
    console.log('role: ', role) 
    if(role === 'Admin') {
        req.app.locals.isAdmin = true
    } else {
        req.app.locals.isAdmin = false
    }
    console.log('req.app.locals.isAdmin: ', req.app.locals.isAdmin);
    next()
}


module.exports = {
    isLoggedIn,
    isLoggedOut,
    isAdmin
}