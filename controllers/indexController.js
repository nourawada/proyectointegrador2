const db = require('../database/models');
const products = db.Product;
const users = db.User;
const op = db.Sequelize.Op;

//const productos = require('../db/productos')

const indexController = {
index:function(req, res) {
    products.findAll()
    .then(function(products){
        return res.render('index', {products:products});
      })
    },
search:function (req,res){
 
  products.findAll ({
      include:[{association: 'user'}, {association: 'comment'}],

      where: [{name: {[op.like]: '%' + req.query.search + '%'}}] 

      })

      .then(function (products){    
        
      return res.render('search-results', {products: products, query: req.query.search});
    })
      .catch(error => console.log('EL ERROR ES: ' + error))
},

} 
module.exports = indexController;