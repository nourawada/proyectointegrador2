const db = require('../database/models');
const products = db.Product;
const users = db.User;
const op = db.Sequelize.Op;
const comment = db.Comment;
const bcrypt = require('bcryptjs');

const usersController = {
    profile: function (req, res) {
        users.findOne({
            where:[{id : req.params.id}],
        })
        .then(function(user){
            products.findAll({
                where: [{usersId : req.params.id}],
            })
            
        })
        res.render('profile', {users: user, productos: products} );
    },
    register: function(req, res){
            return res.render('register');
    },
    show: function(req,res){
        let errores = {}
        
          if(req.body.username == ""){
            errores.message = "El nombre es obligatorio";
            res.locals.errores = errores;
            return res.render('register');
          } else if(req.body.email == ""){
            errores.message = "El email es obligatorio";
            res.locals.errores = errores;
            return res.render('register');
          } else if(req.file == undefined){
            errores.message = "El archivo es obligatorio";
            res.locals.errores = errores;
            return res.render('register');
          }else{
             users.findOne({
                 where:[{ email: req.body.email}]
             })
             .then(function(user){
              if(user !== null){
                  errores.message = "El email ya existe. Debe eligir otro.";
                  res.locals.errores = errores;
              return res.render('register');
              }else{
                  let user = {
                      email: req.body.email,
                      username: req.body.username,
                      password: bcrypt.hashSync(req.body.password, 10),
                      nacimiento: req.body.nacimiento,
                      dni: req.body.dni,
                      image: req.file.filename
                  }
                  users.create(user) 
                  .then(function(response){
                      return res.redirect('/')
                  }) 
                  .catch(error => console.log(error));
              }
             })
          }
        
  
          
      },
      login: function (req, res) {
            return res.render('login');
        },
        
    signIn: function(req,res){ 
    
        let errores = {}
        
        users.findOne({
            where: [{email: req.body.email}]

        })
        .then(function(user){
            if(user){
            let compare = bcrypt.compareSync(req.body.password, user.password);
            if(compare){
            req.session.user = user.dataValues;
            if(req.body.remember){
                res.cookie('userId',user.dataValues.id,{maxAge: 1000*60*100} );
            }
            return res.redirect('/')

            }else{
                errores.message = "incorrect password";
                res.locals.errores = errores
                return res.render('login')

            }

            }else{
                errores.message= "this email doesn't exists"
                res.locals.errores = errores
                return res.render('login');
            }

        })
        .catch(error => console.log(error))
    
    },
    logout: function(req, res){
        //destruir session
        req.session.destroy();

        //Eliminar cookie si existe.
        if(req.cookies.userId !== undefined){
            res.clearCookie('userId')
        }

        return res.redirect('/');

    },

    profileEdit: function (req, res) {
        res.render('profile-edit', {usuario: usuario} );
    }
};


module.exports = usersController;