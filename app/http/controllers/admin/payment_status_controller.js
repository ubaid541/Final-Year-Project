const Order = require('../../../models/orders')


function paymentStatusController(){
    return {
        update(req,res){
            // orderId and payment_status are name attributes in form
            Order.updateOne({_id : req.body.orderId},{payment_status : req.body.payment_status},(err,data)=>{
                if(err){
                   return res.redirect('/admin/orders')
                }
               return res.redirect('/admin/orders')
            })
        }
    }
}

module.exports = paymentStatusController