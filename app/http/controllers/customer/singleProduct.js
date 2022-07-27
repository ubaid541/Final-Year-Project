const Product = require('../../../models/seller/products')


function singleProduct(){
    return{
        async index(req,res){
            var id = req.params.id
            const product = await Product.find({_id : id }).populate(['pro_addon','pro_attr','discount','seller_id'])
            res.render('customer/singleProduct',{product : product})
        }
    }
}

module.exports = singleProduct