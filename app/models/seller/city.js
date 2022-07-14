const mongoose = require('mongoose')
const Schema = mongoose.Schema

const city = new Schema({
    city_name : {type: String, required:true},   
 }, {timestamps: true})

module.exports = mongoose.model('city',city)