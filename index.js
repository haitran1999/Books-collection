const express = require('express');
const app = express();
// const db = require('./db.js');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const removeDiacritics = require('diacritics').remove;
const path = require('path');
var session = require('express-session');
const Book = require('./models/book.model.js');
mongoose.connect('mongodb://localhost/library');
 
const wishlistRouter  = require('./routes/wishlist.router.js');
const productRouter = require('./routes/product.router.js');
const bodyParser = require('body-parser');

 

app.use(session({
	secret: 'hai tran',
	resave: false,
	saveUninitialized: true
}))

app.set('views', './render');
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use("/uploads" , express.static(__dirname + "/uploads"));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.get('/', (req, res)=>{
	res.render('home.pug');
})

app.use('/product', productRouter);
 
app.use('/wishlist', wishlistRouter);

app.get('/*.:id', (req, res)=>{
	const id = req.params.id;
	Book.findById(id, function (err, data) {
		 if(err){
			 console.log(err);
		 }else{
			console.log(data.avatar);
			res.render('view.pug', {
				book: data
			});
		 }
	});
	if(!req.session.view){
		req.session.view = [];
	}
	req.session.view.push(id);	
})

app.get('/ds', (req, res)=>{
	const id = req.session.view; // array
	Book.find({_id: id}).exec((err, data)=>{
		if(err){
			console.log(err);
		}else{
			res.render('ds.pug', {danhsach: data});
		}
	})
})

app.listen(port, ()=>{
	console.log(`Listening at port ${port}`);
})