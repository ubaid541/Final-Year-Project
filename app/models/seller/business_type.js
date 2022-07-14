const mongoose = require('mongoose')
const Schema = mongoose.Schema

const b_type_Schema = new Schema({
    business_type_name : {type: String, required:true},   
 }, {timestamps: true})

module.exports = mongoose.model('business_type',b_type_Schema)