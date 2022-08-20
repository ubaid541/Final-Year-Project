const Product = require('../../../models/seller/products')

function searchController(){
    return{
       async search(req,res){
            let query = req.query.search_query
            //let search_product = await Product.find({"pro_name": {"$regex": query, "$options": "i"}})

            Product.find({"pro_name": {"$regex": query, "$options": "i"}},{"pro_name" : 1,"_id": 0}).exec((err,search_product)=>{
                if(err){
                    console.log(err)
                }else{
                return res.json(search_product)
                }
            })
        
        },
        async searchResult(req,res){
            const {pro_box} = req.query
            const product = await Product.find({"pro_name": {"$regex": pro_box, "$options": "i"}}).populate(['pro_addon','pro_attr','seller_id'])

            return res.render('customer/searchResult',{product : product, pro_box : pro_box})

        }
    }
}

module.exports = searchController