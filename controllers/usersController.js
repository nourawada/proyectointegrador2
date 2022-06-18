const db = require('../database/models');
const products = db.Product;
const users = db.User;
const op = db.Sequelize.Op;
const comment = db.Comment;
const bcrypt = require('bcryptjs')



const usersController = {
    register: function(req, res){
            return res.render('register');
    },
    procesarRegister: function(req,res){
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
                      name: req.body.username,
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
        if(req.session.user != undefined){
            return res.redirect('/')
        } else {  
            return res.render('login');
        }
    },
    signIn: function(req,res){ 
        users.findOne({
            where: [{email: req.body.email}]

        })
        .then(function(users){
            console.log(req.body);
            if(users){
            req.session.users = users.dataValues;
            res.cookie('userId', users.dataValues.id,{maxAge: 1000*60*100})
            }
            console.log(req.session.user);
            return res.redirect('/')
        })
        .catch(error => console.log(error))

    },

    profile: function (req, res) {
        res.render('profile', {usuario: usuario, productos: productos} );
    },
    profileEdit: function (req, res) {
        res.render('profile-edit', {usuario: usuario} );
    }
};


module.exports = usersController;