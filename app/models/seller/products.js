const mongoose = require('mongoose')
const Schema = mongoose.Schema

const proSchema = new Schema({
    pro_name : {type: String, required:true},
    pro_desc : {type: String, required:true},
    pro_price : {type: Number, required:true},
    discount : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Coupon',
    },
    pro_category : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
    },
    pro_addon : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Addon',
    },
    pro_attr : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Attribute',
    },
    seller_id : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Business',
        required:true
    },
    pro_image : {type : String, required : true}
 }, {timestamps: true})

module.exports = mongoose.model('Product',proSchema)