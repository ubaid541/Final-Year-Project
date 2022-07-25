const Product = require('../../../models/seller/products')

function allProducts(){
     return{
        async index(req,res){
            const product = await Product.find(null,null,{sort : {'createdAt' : -1}}).populate(['pro_addon','pro_attr','seller_id'])
            return res.render('customer/allproducts',{
                product : product
            })
            }
        }
    }


module.exports = allProducts