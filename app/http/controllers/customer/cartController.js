function cartController(){
    return{
        index(req,res){
            return res.render('customer/cart')
        },
        update(req,res){
            // first time creating cart and store in 'cart' variable
            if(!req.session.cart){
                req.session.cart = {
                    items : {},
                    totalQty: 0,
                    totalPrice : 0
                }
            }
            let cart = req.session.cart
            
            // if item does not exists in cart
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item : req.body,
                    qty : req.body.qty,
                    sub_total : 0
                }
                cart.totalQty = cart.totalQty + req.body.qty

                price_quantity = req.body.pro_price  * req.body.qty
                extra_prices = price_quantity + req.body.addon + req.body.attr
                single_product_price = extra_prices - req.body.coupon

                cart.items[req.body._id].sub_total =  cart.items[req.body._id].sub_total + single_product_price
                cart.totalPrice = cart.totalPrice + single_product_price
            }else{
                cart.items[req.body._id].qty =  cart.items[req.body._id].qty + req.body.qty
                cart.totalQty = cart.totalQty + req.body.qty

                price_quantity = req.body.pro_price  * req.body.qty
                extra_prices = price_quantity + req.body.addon + req.body.attr
                single_product_price = extra_prices - req.body.coupon

                cart.items[req.body._id].sub_total =  cart.items[req.body._id].sub_total + single_product_price
                cart.totalPrice = cart.totalPrice + single_product_price
            }

            return res.json({totalQty : req.session.cart.totalQty})
        }
    }
}

module.exports = cartController