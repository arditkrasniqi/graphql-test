const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    genre: {type: String, required: true}
});

module.exports = mongoose.model('Book', bookSchema);