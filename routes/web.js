const homeController = require('../app/http/controllers/admin/homeController')
const addonController = require('../app/http/controllers/admin/addons')

const authController = require('../app/http/controllers/admin/authController')


const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')

function initRoutes(app){

    // seller routes
    app.get('/admin',auth,homeController().index);
    app.get('/addons',auth,addonController().index);
    app.post('/add-addon',auth,addonController().addAddons);
    app.get('/delete-addon/:id',auth,addonController().deleteAddon);
    app.get('/edit-addon/:id',auth,addonController().editAddon);
    app.post('/edit-addon',auth,addonController().posteditAddon);

    // login
    app.get('/login',guest,authController().login)
    app.post('/login',authController().postLogin)
    app.post('/logout',authController().logout)

    // Registeration
    app.get('/register-seller',guest,authController().sellerRegister)               // seller registeration
    app.post('/register-seller',authController().postSellerRegister)               // seller registeration
}

module.exports = initRoutes
