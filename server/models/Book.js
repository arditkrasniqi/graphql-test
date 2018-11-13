const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    genre: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, rel: 'Author' }
});

module.exports = mongoose.model('Book', bookSchema);