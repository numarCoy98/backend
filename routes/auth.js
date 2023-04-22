/*
    Rutas de usuarios / auth
    host + /api/auth

*/

const express = require('express');
const router = express.Router();    //configurar una ruta
const { check } = require('express-validator')

const { loginUsuario, revalidarToken } = require('../controllers/auth')

// 
// router.post('/registro',
//     [check('name', 'El nombre es obligatorio').not().isEmpty(),],
//     crearUsuario
// )

router.post('/', loginUsuario)

router.get('/renew', revalidarToken)


module.exports = router;