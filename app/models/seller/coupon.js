const mongoose = require('mongoose')
const Schema = mongoose.Schema

const couponSchema = new Schema({
    coupon_name : {type: String, required:true},
    coupon_desc : {type: String, required:true},
    coupon_value : {type: Number, required:true},
    coupon_expired : {type: Date, required:true},
    seller_id : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'businesses',
        required:true
    },
    coupon_status : {type : Boolean, required : true}
 }, {timestamps: true})

module.exports = mongoose.model('Coupon',couponSchema)