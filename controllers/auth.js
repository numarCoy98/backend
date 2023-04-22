const { response } = require('express') //para el intelices 

const crearUsuario = (req, res = response) => {
    const { name, email, password } = req.body
    res.status(201).json({ ok: true, msg: 'registro', name, email, password })

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