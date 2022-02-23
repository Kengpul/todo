const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: [true, 'cannot be blank'],
    },
})

module.exports = mongoose.model("Todo", todoSchema);