var mongoose = require('mongoose');

const bookSchema =  new mongoose.Schema({
	name: String,
	author: String,
	description: String,
	avatar: String
})

const Book =  mongoose.model('Book', bookSchema, 'books');

module.exports = Book;