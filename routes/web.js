const homeController = require('../app/http/controllers/admin/homeController')
const addonController = require('../app/http/controllers/admin/addons')
const attrController = require('../app/http/controllers/admin/attributes')
const catController = require('../app/http/controllers/admin/categories')
const couponController = require('../app/http/controllers/admin/coupons')
const cityController = require('../app/http/controllers/admin/city')
const productController = require('../app/http/controllers/admin/products')
const authController = require('../app/http/controllers/admin/authController')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/orderStatusController')
const paymentStatusController = require('../app/http/controllers/admin/payment_status_controller')
const commentController = require('../app/http/controllers/admin/comment')

// customer modules
const indexController = require('../app/http/controllers/customer/indexController')
const searchController = require('../app/http/controllers/customer/searchController')
const custAuthController = require('../app/http/controllers/customer/authController')
const allProducts = require('../app/http/controllers/customer/allProducts')
const singleProduct = require('../app/http/controllers/customer/singleProduct')
const allBusinesses = require('../app/http/controllers/customer/allBusinesses')
const allCategory = require('../app/http/controllers/customer/allCategory')
const allCity = require('../app/http/controllers/customer/allCity')
const cartController = require('../app/http/controllers/customer/cartController')
const orderController = require('../app/http/controllers/customer/orderController')



// middlewares
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const user_role = require('../app/http/middlewares/user_role')
const admin = require('../app/http/middlewares/admin')
const customer_guest = require('../app/http/middlewares/customer/guest')
const customer_auth = require('../app/http/middlewares/customer/auth')

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

    app.get('/admin/orders',auth,adminOrderController().index);
    app.get('/admin/delete-order/:id',auth,adminOrderController().delete_order);
    app.post('/admin/order/status',auth,statusController().update);
    app.post('/admin/order/payment_status',auth,paymentStatusController().update);

    app.post('/comment',customer_auth,commentController().index)


    // seller routes ends

    // Customer routes
    app.get('/',indexController().index);
    app.get('/all-products',allProducts().index);
    app.get('/single-product/:id',singleProduct().index);
    app.get('/all-businesses',allBusinesses().index);
    app.get('/single-business/:id',allBusinesses().singleBusiness);
    app.get('/all-categories',allCategory().index);
    app.get('/single-category/:id',allCategory().singleCategory);
    app.get('/all-cities',allCity().index)
    app.get('/single-city/:id',allCity().singleCity)
    app.get('/cart',customer_auth,cartController().index)
    app.post('/update-cart',cartController().update)
    app.post('/orders',orderController().store)
    app.get('/customer-orders',customer_auth,orderController().order_list)
    app.get('/customer/delete-order/:id',customer_auth,orderController().delete_order)
    app.get('/search-product',searchController().search)
    app.get('/search-result',searchController().searchResult)


    
    app.get('/customer-login',customer_guest,custAuthController().index)
    app.post('/customer-login',custAuthController().postCustomerLogin)
    app.post('/customer-logout',custAuthController().logout)

    app.get('/register-customer',customer_guest,custAuthController().registerCustomer)     // customer registeration
    app.post('/register-customer',custAuthController().postCustomerRegister)               // customer registeration
    // app.get('/update-business-profile/:id',authController().updateProfile)





    // seller login
    app.get('/login',guest,authController().login)
    app.post('/login',authController().postLogin)
    app.post('/logout',authController().logout)

    // Registeration
    app.get('/register-seller',guest,authController().sellerRegister)               // seller registeration
    app.post('/register-seller',authController().postSellerRegister)               // seller registeration
    app.get('/update-business-profile/:id',auth,authController().updateProfile)               // profile update
    app.post('/update-business-profile',auth,authController().postUpdateProfile)               // profile update
}

module.exports = initRoutes
