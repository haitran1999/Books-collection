const express = require('express');
const app = express();
const router = express.Router();
 
const Wishlist = require('../models/wishlist.model.js');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });
const Book = require('../models/book.model.js');
const controller = require("../controller/product.controller.js");
const determinePage = require('../middleware/determinePage');

router.get('/',controller.index);

router.get('/create', controller.create);

router.post('/create', upload.single('avatar'), controller.postCreate);

router.get('/edit/:id', controller.edit);

router.post('/edit/:id', controller.postEdit);

router.get('/delete/:id', controller.delete);

module.exports = router;
 