var mongoose = require('mongoose');

const wishlistSchema =  new mongoose.Schema({
	name: String,
	author: String,
	description: String,
	avatar: String
})

const Wishlist =  mongoose.model('Wishlist',wishlistSchema, 'wishlist');

module.exports = Wishlist;