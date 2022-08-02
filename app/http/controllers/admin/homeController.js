const Order = require('../../../models/orders')
const moment = require('moment')

function homeController(){
    // factory method (return object)
    return {
        // method
        async index(req,res){

            const new_orders = await Order.count({ status : 'order_placed'})
            const processing_orders = await Order.count({ status : 'processing'})
            const canceled_orders = await Order.count({ status : 'cancelled'})  
            const orders = await Order.find({status : {$ne : 'completed'}}, null, {sort : {'createdAt' : -1}}).populate('customerId','-password')          
            
            return  res.render('./admin-dashboard/admin',{
                new_orders : new_orders,
                processing_orders : processing_orders,
                cancelled_orders : canceled_orders,
                orders : orders,
                moment : moment
            })

            // Product.find().then(function(products){
            //     console.log(products)
            //     return  res.render('home',{products : products})
            // })
           
        }
    }

}

module.exports = homeController