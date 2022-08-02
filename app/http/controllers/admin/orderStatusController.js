const Order = require('../../../models/orders')


function statusController(){
    return {
        update(req,res){
            // orderId and status are name attributes in form
            Order.updateOne({_id : req.body.orderId},{status : req.body.status},(err,data)=>{
                if(err){
                   return res.redirect('/admin/orders')
                }
               return res.redirect('/admin/orders')
            })
        }
    }
}

module.exports = statusController