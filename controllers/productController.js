const productos = require('../db/producto')
const productController = {
    index: function(req, res){
        return res.render('productos',{listadoProductos: productos.lista})
    }, 
}