/*
    Rutas de usuarios / auth
    host + /api/auth

*/

const express = require('express');
const router = express.Router();    //configurar una ruta
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')

router.post('/registro',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        check('role', 'El rol es obligatorio').custom((value, { req }) => ['student', 'moderator'].some(role => role === value)),
        validarCampos
    ],
    crearUsuario
)

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario)

router.get('/renew', revalidarToken)

module.exports = router;