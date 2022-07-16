const mongoose = require('mongoose')
const Schema = mongoose.Schema

const catSchema = new Schema({
    cat_name : {type: String, required:true,unique: true},
    seller_id : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'businesses',
        required:true
    },
 }, {timestamps: true})

module.exports = mongoose.model('Category',catSchema)