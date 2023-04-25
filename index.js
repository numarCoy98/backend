const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
const { Server: SocketServer } = require('socket.io')
const http = require('http')

require('dotenv').config();

// Crear el servidor de express
const app = express();
const server = http.createServer(app);

// Configurar el cors para que reciba solo el del localHost
const io = new SocketServer(server, {
    cors: {
        // origin: `http://localhost:${process.env.PORT}`
        origin: `*`
    }
});

console.log(`http://localhost:${process.env.PORT}`)

io.on('connection', (socket) => {
    // console.log({ 'id': socket.id });
    // console.log('a user connected', 'id', socket.id);
    socket.on('newMessage', (message) => {
        console.log({ message })
        socket.broadcast.emit('newMessage', true)
    })
});

app.use(cors());

// Base de datos
dbConnection()

// lectura y parseo del boby
app.use(express.json())

// Directorio publico=
// la función USE es un middlewares: una función cuando alguien hace una petición a mi servidor se ejecuta
app.use(express.static('public'));

// Rutas
// TODO: auth // crear usuarios, login, renew
app.use('/api/auth', require('./routes/auth'));

// TODO crud: Eventos
app.use('/api/chat', require('./routes/chat'));

server.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})
