const { Schema, model } = require('mongoose');

const MessageSchema = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    // streaming_id:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'streaming'
    // }
})

// MessageSchema.('toJSON', function () {
//     const { _v, ...object } = this.Object();
//     return object
// })


module.exports = model('Message', MessageSchema);