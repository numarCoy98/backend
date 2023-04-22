const { response } = require('express') //para el intelices 
const Usuario = require('../models/user')

const crearUsuario = async (req, res = response) => {
    const { email, password, role } = req.body
    try {
        let usuario = await Usuario.findOne({ email })
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }
        console.log('crear usuario', { usuario })
        usuario = new Usuario(req.body);
        console.log({ usuario: usuario.id })
        await usuario.save()
        res.status(201).json({
            ok: true,
            msg: 'registro',
            uid: usuario.id,
            name: usuario.name
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error con el servidor'
        })
    }

}

const loginUsuario = (req, res = response) => {
    const { email, password } = req.body
    res.status(201).json({ okay: true, msg: 'login', email, password })
}

const revalidarToken = (req, res) => {
    res.json({ okay: true, msg: 'renew' })
}

module.exports = {
    revalidarToken, loginUsuario, crearUsuario
}