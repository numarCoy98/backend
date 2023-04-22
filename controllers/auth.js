const { response } = require('express') //para el intelices 
const Usuario = require('../models/user')
const bcrypt = require('bcryptjs')


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
        // Encriptar contraseña

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)

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

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body
    try {
        let usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe (email)'
            });
        }

        // confirmar los password
        const validPassword = bcrypt.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        // Generar nuestro JWT

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error con el servidor'
        })
    }
}

const revalidarToken = (req, res) => {
    res.json({ okay: true, msg: 'renew' })
}

module.exports = {
    revalidarToken, loginUsuario, crearUsuario
}