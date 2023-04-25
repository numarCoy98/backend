const { response } = require('express') //para el intelices 
const Usuario = require('../models/user')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')


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
        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save()
        res.status(201).json({
            ok: true,
            msg: 'registro',
            uid: usuario.id,
            name: usuario.name
        })
    } catch (error) {
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

        // confirmar el password
        const validPassword = bcrypt.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }
        // Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name)
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error con el servidor'
        })
    }
}

const revalidarToken = async (req, res) => {
    const { uid, name } = req;

    const token = await generarJWT(uid, name)

    res.json({ okay: true, msg: 'renew', token })
}

module.exports = {
    revalidarToken, loginUsuario, crearUsuario
}