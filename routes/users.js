var express = require('express');
var router = express.Router();
const usersController = require ('../controllers/usersController')

let multer = require('multer');
let path = require('path');

//Configurar multer.
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images/users')) //Usamos path.join para evitar problemas de rutas. __dirname da la posición exacta de la carpeta en la que está el archivo. Luego desde ahí nos movemos hasta la carpeta public.
    //Las carpetas deben existir.
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
 
var upload = multer({ storage: storage })

router.get('/register', usersController.register);

router.post('/show', upload.single('image'), usersController.show)

router.get('/login', usersController.login);

router.post('/login', usersController.signIn )

router.post('/logout', usersController.logout)

//router.get('/profile', usersController.profile);

//router.get('/profile-edit', usersController.profileEdit);

module.exports = router;
