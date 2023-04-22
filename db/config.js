const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN).then(() => console.log('Connected!'));
    } catch (error) {
        throw new Error('Error al conectarse a la base de datos');
    }
}


module.exports = { dbConnection }