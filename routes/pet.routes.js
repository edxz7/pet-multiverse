const express = require('express');
const Pet = require('../models/Pet.model');
const petGenerator = require('../utils/pet-generator');
const imgUrlTo64 = require('../utils/imgUrlTo64');
const petRouter = express.Router();
const { isLoggedIn, isAdmin } = require('../middlewares/guard-auth.middleware');


/**
 * READ
 */

// Listar mascotas
petRouter.get('/', isLoggedIn, isAdmin, (req, res) => {
    Pet.find()
    .then(pets => {
        pets.map(pet => pet.isAdmin = req.app.locals.isAdmin )
        res.render('pet/petList', { pets })
    })
})


// pet detail
petRouter.get('/:id/detail', isLoggedIn, (req, res, next) => {
    const { id }  = req.params;
    Pet.findById(id)
    .then(pet => {
        res.render('pet/petDetail', { pet })
    })
    .catch(error => next(error))
})


/**
 * CREATE
 */

petRouter.get('/pet-form', isLoggedIn, (req, res) => {
    res.render('pet/petForm')
})


petRouter.post('/create', async (req, res, next) => {
    const { body } =req;
    console.log('body del formulaio que crea mascotas', body)
    const imageUrl = await petGenerator(body.description);
    const imgBase64  = await imgUrlTo64(imageUrl);

    Pet.create({
        ...body,
        picture: imgBase64
    }).then(() => res.redirect('/pet'))
    .catch(error => next(error))
})


/**
 * UPDATE
 */

petRouter.get('/:id/update', (req, res, next) => {
    const { id } =req.params;
    const isUpdate = true;
    console.log('id: ', id)
    console.log('isUpdate: ', isUpdate)
    Pet.findById(id)
    .then((pet) => res.render('pet/petDetail', { isUpdate, pet }))
    .catch(error => next(error))
})

petRouter.post('/:id/update', (req, res, next) => {
    const { id } =req.params;
    const { body } = req;
    console.log('pet id: ', id);
    console.log('body: ', body);
    Pet.findByIdAndUpdate(id, { ...body }, { new: true})
    .then(pet => res.redirect(`/pet/${pet._id}/detail`))
    .catch(error => next(error))
})



/**
 * DELETE
 */
petRouter.get('/:id/delete', isLoggedIn, (req, res) => {
    const { id } =req.params;
    console.log('pet id: ', id);
    Pet.findByIdAndDelete(id)
    .then(() => res.redirect('/pet'))
    .catch(error => next(error))
})



module.exports = petRouter;