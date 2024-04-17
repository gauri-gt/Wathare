const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    ts: {
        type: String, // Change the data type to String
        required: true
    },
    machine_status: {
        type: Number,
        required: true
    },
    vibration: {
        type: Number,
        required: true
    }
});

const Data = mongoose.model('Data', dataSchema, 'sample-data');

module.exports = Data;
