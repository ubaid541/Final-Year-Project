const Category = require('../../../models/seller/categories')
const Products = require('../../../models/seller/products')


function allCategory(){
    return{
        async index(req,res){
            const category = await Category.find(null,null,{$sort : {'createdAt' : -1}})
            res.render('customer/allCategory',{category : category})
        },
        async singleCategory(req,res){
            const id = req.params.id
            const category = await Category.find({_id : id})
            const singleCategory = await Products.find({pro_category : id}).populate(['pro_category','pro_addon','pro_attr','seller_id'])
            return res.render('customer/singleCategory',{singleCategory : singleCategory, cat_id : category})
        }
    }
}

module.exports = allCategory