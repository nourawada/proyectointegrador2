const usuario = require('../db/usuario')
const usuarioController = {
    index: function(req, res){
        return res.render('usuario',{listadoUsuarios: usuario.lista})
    }, 
}