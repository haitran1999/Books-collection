const Book = require('../models/book.model.js');
const Wishlist = require('../models/wishlist.model.js');



module.exports.index = (req, res)=>{
	res.locals.offSearchDisplay = true;
		Wishlist.find().then(function(books){
			res.render('wishlist.pug',{
				books: books 
			});
		})	
	  
}

module.exports.move = (req, res)=>{
	const id = req.params.id;
	
	Wishlist.findOne({_id:id}, (err, foundData)=>{
		if(err){
			console.log(err);
			return;
		}	
 		let book = new Book();
 		book.name = foundData.name;
 		book.author = foundData.author;
 		book.description = foundData.description;
 		book.avatar = foundData.avatar;

 		foundData.delete();
 		
 		book.save(err=>{
 			if(err){
 				console.log(err);
 			}else{

 				res.redirect('/product');
 			}
 		})

		 
	})

}

// module.exports.create = (req,res)=>{
// 	res.render('wishlistcreate.pug');
// }

// module.exports.postCreate = (req, res)=>{
// 	console.log(req.body);
// }

module.exports.test = (req, res)=>{
	res.render('test.pug');
}
module.exports.postTest = (req, res)=>{
	 
	const add = new Wishlist();
	add.name = req.body.name;
	add.author = req.body.author;
	add.description = req.body.description;
	add.avatar = req.file.path.split("\\").slice(1).join("\\");

	add.save(function(err){
		if(err){
			console.log(err);
		}else{
			res.redirect('/wishlist');
		}
	})
}