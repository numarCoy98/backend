const express = require('express');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// console.log(process.env)

console.log('Hola mundooo!!!!!')

// Crear el servidor de express
const app = express();

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

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})
