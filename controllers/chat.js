const { response } = require('express');
const Message = require('../models/message');

const addMessage = async (req, res = response) => {
    console.log(req.body)

    const message = new Message(req.body);
    try {
        message.user_id = req.uid;
        const mensaje = await message.save();

        return res.status(201).json({
            ok: true,
            msg: 'El mensaje fue añadido',
            message: mensaje
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'El servidor esta fallando'

        })
    }
}

const getMessages = async (req, res = response) => {
    try {
        const messages = await Message.find({})
            .populate('user_id', ['name', 'role'])
        console.log({ messages })
        return res.status(201).json({
            ok: true,
            msg: 'Mensajes cargados',
            messages
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'El servidor esta fallando'

        })
    }

}

module.exports = { addMessage, getMessages }