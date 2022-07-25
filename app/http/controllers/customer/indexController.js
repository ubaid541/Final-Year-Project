const City = require('../../../models/seller/city')
const Product = require('../../../models/seller/products')
const Category = require('../../../models/seller/categories')
const Addon = require('../../../models/seller/addons')
const Attribute = require('../../../models/seller/attribute')
const Coupon = require('../../../models/seller/coupon')
const Seller = require('../../../models/seller/seller')

function indexController(){
    return{
        async index(req,res){
        const product = await Product.find(null,null,{sort : {'createdAt' : -1}}).populate(['pro_addon','pro_attr','seller_id']).limit(3)
        let cities = await City.find({sort : {'createdAt' : -1}}).limit(3)
        let category = await Category.find({sort : {'createdAt' : -1}}).limit(3)

        return res.render('customer/index',{
            product : product,
            city : cities,
            category : category
        })
        }
    }
}

module.exports = indexController