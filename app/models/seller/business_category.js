const mongoose = require('mongoose')
const Schema = mongoose.Schema

const b_cat_Schema = new Schema({
    business_category_name : {type: String, required:true,unique: true},   
 }, {timestamps: true})

module.exports = mongoose.model('business_category',b_cat_Schema)