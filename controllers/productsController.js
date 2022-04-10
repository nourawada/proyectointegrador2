const productos = require('../db/products')
const productController = {
    index: function(req, res){
        return res.render('product',{listadoProductos: productos.lista})
    }, 

productadd: function(req, res){
    return res.render('product-add',{listadoProductos: productos.lista})
}, 
}

module.exports = productController