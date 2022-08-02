const Order = require('../../../models/orders')
const moment = require('moment')

function adminOrderController(){
    return{
         index(req,res){

            Order.find({status : {$ne : 'completed'}}, null, {sort : {'createdAt' : -1}}).populate('customerId','-password').exec((err,orders)=>{
              
                 // if ajax call
                 if(req.xhr){
                    return res.json(orders)
                    
                }else{
                    return res.render('admin-dashboard/orders/orders')
                }
            })
            
        },
        async delete_order(req,res){
            Order.deleteOne({_id : req.params.id})
            .then(result=>{
                req.flash('success','Order deleted successfully.')
                return res.redirect('/admin/orders')
            })
            
        }
    }
}

module.exports = adminOrderController