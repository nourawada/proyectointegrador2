
const db = require('../database/models');
const products = db.Product;
const users = db.User;
const op = db.Sequelize.Op;
const comment = db.Comment;


const productController = {
     productId:
     function (req,res){
        products.findOne({
            where: [{id: req.params.id}],
            include: [{association: 'user'}, {association: 'comment', order: [['createdAt', 'order','DESC']]}],
            //order: ['comentarios', 'order', 'desc']
        })
            .then(function(products){
                let comentarios = products.comment.slice().sort((a,b) => b.createdAt - a.createdAt);//como la consigna pide que los comentarios esten en orden descendiente ordenados por createdAt, con esta linea resolvemos esto
                products.comment = comentarios;
                //res.send(comentariosOrdenados)

                let comment = [];//checkear si el codigo este esta bien o hay otra forma de resolver
                if(products.comment[0] != undefined){
                    //return res.send('hay comentarios')
                    for(let i = 0; i < products.comment.length; i++){
                        users.findOne({
                            where: [{id: products.comment[i].users_id}]
                        })
                        .then(function(comment){
                            comment.push(comment);
                            if(i == products.comment.length - 1){
                                //return res.send(comentadores)
                                return res.render('product', {products: products, comment: comment, id: req.params.id});
                            }
                        })
                    }
                } else {
                    //return res.send('no hay comentarios')
                    return res.render('product', {products: products, comment: [], id: req.params.id});
                }
                //return res.send(unTelefono)
                
            })
        //return res.render('product', {info: data, array: array, id: req.params.id});
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
    console.log(req.body);
     //Obtener los datos del formulario y armar el objeto literal que quiero guardar
     let product = {
         name: req.body.name,
         image: req.file.filename,
         brand: req.body.brand,
         descripcion: req.body.descripcion,
         users_id: req.body.users_id,
         products_id: req.body.products_id,
     }
     
     
     //Guardar la info en la base de datos
     products.create(product)
         .then( function(respuesta){ //En el parámetro recibimos el registro que se acaba de crear en la base de datos.
             //return res.send(respuesta)
             //redirigir
             return res.redirect(`/profile/${product.products_id}`);
         })
         .catch( error => console.log(error))
 },

 commentStore: function (req, res){
    console.log(req.body);
    if(req.body.text==""){
        res.redirect('/product/' + req.body.products_id);
    }
    else{
    let comment = {
        text: req.body.text,
        users_id: req.body.users_id,
        products_id: req.body.products_id
    }
  

    products.findOne({
        where: [{id: comment.products_id}]
    })
.then(function(result){
    let producto = {
        id: result.id,
        image: result.image,
        brand: result.brand,
        users_id: result.users_id,
    }
 products.update(producto, {
    where: {id: comment.products_id}
})
.then(function(){
    return res.redirect(`/product/${producto.id}`);

})
})
}
}
}
module.exports = productController