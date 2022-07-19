const express = require('express')
const router = express.Router();
const { searchProducts, descriptionProducts } = require('../controller/search.controller');


// route product list
router.get('/', searchProducts);

// route description product
router.get('/:id', descriptionProducts);

module.exports = router;  