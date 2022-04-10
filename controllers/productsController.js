const productos = require('../db/products')
const comentarios = require('../db/comentarios')
const productController = {
    index: function(req, res){
        return res.render('product',{productos: productos, comentarios: comentarios})
    }, 

productadd: function(req, res){
    return res.render('product-add',{productos: productos, comentarios: comentarios})
}, 
}

module.exports = productController