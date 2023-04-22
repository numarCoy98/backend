/*
    Rutas del chat / chat
    host + /api/chat

*/

const express = require('express');
const router = express.Router();    //configurar una ruta
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')



const { addMessage, getMessages } = require('../controllers/chat');
const { validarJWT } = require('../middlewares/validar-jwt');

router.use(validarJWT); //validar siempre el token de todos los query que esten debajo

router.post('/addMessage', [
    check('message', 'El mensaje no debe estar vacio').not().isEmpty(),
    check('date', 'La fecha es obligatoria').isDate(),
    validarCampos
], addMessage)

router.get('/getMessages', getMessages)

module.exports = router;

