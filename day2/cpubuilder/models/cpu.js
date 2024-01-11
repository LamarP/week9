const { Schema, model } = require('mongoose');

const cpuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    // parts: {
    //     parts: [
    //         {
    //             name: {
    //                 type: String,
    //                 required: false
    //             },
    //             amount: {
    //                 type: Number,
    //                 required: false
    //             }
    //         }
    //     ]
    // }
    parts: [{ name: String, amount: Number }]
});

module.exports = model('cpu', cpuSchema);