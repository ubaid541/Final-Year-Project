const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addonSchema = new Schema({
    addon_name : {type: String, required:true,unique: true},
    addon_price : {type: Number, required:true},
    seller_id : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Business',
        required:true
    },
 }, {timestamps: true})

module.exports = mongoose.model('Addon',addonSchema)