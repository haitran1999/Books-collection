const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const deteterminePage = require('../middleware/determinePage.js');
const removeDiacritics = require('diacritics').remove;
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

 

const Book = require('../models/book.model.js');
const Wishlist = require('../models/wishlist.model.js');

module.exports.index = (req, res)=>{
	let search = req.query.search;
	if(search){	 
		Book.find().then(function(book){
		let matchedBook = book.filter(function(each){
			 return removeDiacritics(each.name).toLowerCase().indexOf(removeDiacritics(search).toLowerCase()) !== -1;
		});
		// dễ bị lỗi khi dữ liệu có 1 phần bị null
		res.render('product.pug',{
			books: matchedBook,
			display: true,
			total: matchedBook.length,
			value: search
		})
	});
	}
	else {
	const perPage = 8;
	let page = parseInt(req.query.page) || 1;
	const start = (page-1) * perPage;
	const end = page * perPage;
	 
	Book.find().then(function(books){ 
		const totalPage = Math.floor(books.length / perPage ) + 1;
		 	if(page+ 2 > totalPage){
		 		res.locals.hide2 = true;
		 	}
		 	if( page ==1 && totalPage <=2 ){
		 		res.locals.hide1 = true;
		 		res.locals.trick1 = true;
			}
			if( page ==2 && totalPage <=2 ){
				res.locals.hide1 = true;
				res.locals.trick1 = false;
				res.locals.trick2 = true;
			}
			if(totalPage < 3){
				res.locals.circle3 = true;
			}
			if(totalPage >= 3 && page < totalPage){
				 	if(page == 1){
						res.locals.hide1 = true;
						res.locals.hide2 = true;
						res.locals.trick1 = true;
					}
					if(page == 2){
						res.locals.hide1 = true;
						res.locals.hide2 = true;
						res.locals.trick1 = false;
						res.locals.trick2 = true;
					 }
			}
		 	 
	 	res.render('product.pug', {
	 		books: books.slice(start , end),
	 		total: books.length,
	 		page: page,
	 		totalPage: totalPage
	 	})

	 })
};

}
 



module.exports.create = (req, res)=>{
	res.render('create.pug');
};

module.exports.postCreate = (req, res)=>{
	const add = new Book();
	// console.log(req.body);
	add.name = req.body.name;
	add.author = req.body.author;
	add.description = req.body.description;
	add.avatar = req.file.	path.split("\\").slice(1).join("\\");

	add.save(function(err){
		if(err){
			console.log(err);
		}else{
			res.redirect('/product');
		}
	})

};

 

module.exports.delete = (req, res)=>{
	
	const id = req.params.id;
	Book.findOneAndRemove({_id: id}, err=>{
		if(err){
			console.log(err);
			return res.status(5000).send();
		}
		res.redirect('/product');
		return res.status(200).send();
	})
};
 

module.exports.edit = (req, res)=>{
	const id = req.params.id;
	Book.findOne({_id: id}, (err,foundData)=>{
		if(err){
			console.log(err);
		}
		else{
			res.render('edit.pug', {
				values: foundData
			})
		}
	})

};

module.exports.postEdit = (req,res)=>{
	const id = req.params.id;
	let book = {};
	book.name = req.body.name;
	book.author = req.body.author;
	book.description = req.body.description;
	let query = {_id: id};

	Book.update(query, book, function(err){
		if(err){
			console.log(err);
			return;
		}else{
			res.redirect('/product');
		}
	})
	 

	 
};

 
 



  