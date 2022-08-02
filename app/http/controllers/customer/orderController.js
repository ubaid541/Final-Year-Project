const Order = require("../../../models/orders")
const moment = require('moment')

function orderController(){
    return{
        store(req,res){
            const {phone , address, email} = req.body
            
            const order = new Order({
                customerId : req.user._id,
                items : req.session.cart.items,
                totalQty : req.session.cart.totalQty,
                totalPrice : req.session.cart.totalPrice,
                phone : phone,
                address : address,
                email : email
            })

            order.save().then(result=>{
                req.flash('success','Order placed successfully.')
                delete req.session.cart 
                return res.redirect('/customer-orders')
            }).catch(err=>{
                req.flash('error','Something went wrong')
                console.log(err)
                return res.redirect('/cart')
            })
        },
        async order_list(req,res){
            const order = await Order.find({customerId : req.user._id},null,{sort : {'createdAt': -1}}).populate('customerId')

            return res.render('customer/customer-order', {
                orders : order,
                moment : moment
            })

        },
        async delete_order(req,res){
            Order.deleteOne({_id : req.params.id})
            .then(result=>{
                req.flash('success','Order deleted successfully.')
                return res.redirect('/customer-orders')
            })
            
        }
    }
}

module.exports = orderController