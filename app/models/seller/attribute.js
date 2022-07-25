const mongoose = require('mongoose')
const Schema = mongoose.Schema

const attrSchema = new Schema({
    attr_name : {type: String, required:true,unique: true},
    attr_price : {type: Number, required:true},
    seller_id : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Business',
        required:true
    },
 }, {timestamps: true})

module.exports = mongoose.model('Attribute',attrSchema)