const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
   customerId : {
       type: mongoose.Schema.Types.ObjectId, 
       ref : 'Business',
       required:true
    },
   // sellerId : {
   //     type: mongoose.Schema.Types.ObjectId, 
   //     ref : 'Business',
   //     required:true
   //  },
  items: {type : Object, required : true},
  totalQty : {type : String, require : true},
  totalPrice : {type : String, require : true},
  phone : {type : String, required : true},
  address : {type : String, required : true},
  email : {type : String, required : true},
  paymentType : {type : String, default : 'cod'},
  payment_status : {type : String, default : 'unpaid'},
  status : {type : String, default : 'order_placed'},
}, {timestamps: true})


module.exports = mongoose.model('Order',orderSchema)