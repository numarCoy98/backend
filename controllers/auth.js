const { response } = require('express') //para el intelices 

const loginUsuario = (req, res = response) => {
    const { email, password } = req.body
    res.json({ okay: true, msg: 'login', email, password })
}

const revalidarToken = (req, res) => {
    res.json({ okay: true, msg: 'renew' })
}

module.exports = {
    revalidarToken, loginUsuario
}