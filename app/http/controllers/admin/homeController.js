// const Product = require('../../models/product')

function homeController(){
    // factory method (return object)
    return {
        // method
        async index(req,res){

            // const products = await Product.find()
            return  res.render('./admin-dashboard/admin')

            // Product.find().then(function(products){
            //     console.log(products)
            //     return  res.render('home',{products : products})
            // })
           
        }
    }

}

module.exports = homeController