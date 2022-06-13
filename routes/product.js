const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController')

/* GET home page. */
router.get('/product-add', productController.productadd)
router.post('/product-store', productController.productstore) //Ruta que guarda datos
router.get('/:id', productController.productId)

module.exports = router

 