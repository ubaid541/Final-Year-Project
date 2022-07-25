const Seller = require('../../../models/seller/seller')
const Product = require('../../../models/seller/products')
const Category = require('../../../models/seller/categories')

function allBusinesses(){
     return{
        async index(req,res){
            const seller = await Seller.find({role : 'seller'},null,{sort : {'createdAt' : -1}}).populate(['business_city','business_type','business_category'])
            return res.render('customer/allBusinesses',{
                seller : seller
            })
            },
            async singleBusiness(req,res){
                const id = req.params.id
                const business = await Seller.find({_id : id})
                const category = await Category.find({seller_id : id})
                const product = await Product.find({seller_id : id}).populate(['pro_addon','pro_attr'])
                return res.render('customer/singleBusiness',
                {
                    business : business,
                    category : category,
                    product : product
                }
                )
            }
        }
    }


module.exports = allBusinesses