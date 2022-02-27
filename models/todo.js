const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: [true, 'cannot be blank'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

module.exports = mongoose.model("Todo", todoSchema);