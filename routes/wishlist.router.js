const express = require('express');
const app = express();
const router = express.Router();
 
const Wishlist = require('../models/wishlist.model.js');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });
const controller = require('../controller/wishlist.controller.js');

router.get('/', controller.index);

router.get('/add/:id', controller.move);

// router.get('/create', controller.create);

// router.post('/create', controller.postCreate);

router.get('/test', controller.test);

router.post('/test/', upload.single('avatar'), controller.postTest);

module.exports = router;