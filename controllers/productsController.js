
const db = require('../database/models');
const products = db.Product;
const users = db.User;
const op = db.Sequelize.Op;
const comment = db.Comment;


const productController = {
     productId:
     function(req, res){
          products.findByPk(req.params.id)
          .then(products =>{res.render('product',{products: products, comment: comment})})
     },


productadd: function(req, res){
     //renderizar el form para crear un producto.
     if(req.session.user == undefined){
         return res.redirect('/users/login')
     } else {  
         products.findAll()
             .then( function(products){
                 return res.render('product-add', {products: products})
             })
             .catch(error => console.log(error))
     }

 }, 
   

productStore: function(req, res){
     //Obtener los datos del formulario y armar el objeto literal que quiero guardar
     let product = {
         name: req.body.name,
         image: req.file.filename,
         brand: req.body.brand,
         descripcion: req.body.descripcion,
     }
     
     //Guardar la info en la base de datos
     products.create(product)
         .then( function(respuesta){ //En el parámetro recibimos el registro que se acaba de crear en la base de datos.
             //return res.send(respuesta)
             //redirigir
             return res.redirect('/')
         })
         .catch( error => console.log(error))

 }
    
}
module.exports = productController