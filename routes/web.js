const homeController = require('../app/http/controllers/admin/homeController')
const addonController = require('../app/http/controllers/admin/addons')
const attrController = require('../app/http/controllers/admin/attributes')
const catController = require('../app/http/controllers/admin/categories')
const couponController = require('../app/http/controllers/admin/coupons')
const productController = require('../app/http/controllers/admin/products')

const authController = require('../app/http/controllers/admin/authController')

// middlewares
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const user_role = require('../app/http/middlewares/user_role')

function initRoutes(app){

    // seller routes
    app.get('/admin',auth,homeController().index);
    app.get('/addons',auth,addonController().index);
    app.post('/add-addon',user_role,addonController().addAddons);
    app.get('/delete-addon/:id',auth,addonController().deleteAddon);
    app.get('/edit-addon/:id',user_role,addonController().editAddon);
    app.post('/edit-addon',user_role,addonController().posteditAddon);

    app.get('/attributes',auth,attrController().index);
    app.post('/add-attr',user_role,attrController().addAttr);
    app.get('/delete-attr/:id',auth,attrController().deleteAttr);
    app.get('/edit-attr/:id',user_role,attrController().editAttr);
    app.post('/edit-attr',user_role,attrController().posteditAttr);

    app.get('/categories',auth,catController().index);
    app.post('/add-category',user_role,catController().addCat);
    app.get('/delete-cat/:id',auth,catController().deleteCat);
    app.get('/edit-cat/:id',user_role,catController().editCat);
    app.post('/edit-cat',user_role,catController().posteditCat);

    app.get('/coupons',auth,couponController().index);
    app.post('/add-coupon',user_role,couponController().addCoupon);
    app.get('/delete-coupon/:id',auth,couponController().deleteCoupon);
    app.get('/edit-coupon/:id',user_role,couponController().editCoupon);
    app.post('/edit-coupon',user_role,couponController().posteditCoupon);

    app.get('/products',auth,productController().index);
    app.get('/add-product',user_role,productController().addProduct);
    app.post('/add-product',user_role,productController().postAddProduct);
    app.get('/delete-product/:pid',auth,productController().deleteProduct);
    app.get('/edit-product/:id',user_role,productController().editProduct);
    app.post('/edit-product',user_role,productController().posteditProduct);

    // seller routes ends

    // Customer routes
    app.get('/',homeController().index);




    // login
    app.get('/login',guest,authController().login)
    app.post('/login',authController().postLogin)
    app.post('/logout',authController().logout)

    // Registeration
    app.get('/register-seller',guest,authController().sellerRegister)               // seller registeration
    app.post('/register-seller',authController().postSellerRegister)               // seller registeration
    app.get('/update-business-profile/:id',authController().updateProfile)               // profile update
}

module.exports = initRoutes
