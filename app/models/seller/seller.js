const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fname : {type: String, required:true},
    lname : {type: String, required:true},
    username : {type: String, required:true,unique: true},
    email : {type: String, required:true, unique: true},
    phone : {type: Number, required:true},
    password : {type: String, required:true},
    address : {type: String, required:true},
    role : {type: String, default: 'seller'},
    business_name : {type: String, required:true,unique:true},
    business_city : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'city',
        required:true
    },
    business_type : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'business_type',
        required:true
    },
    business_category : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'business_category',
        required:true
    },
 }, {timestamps: true})

module.exports = mongoose.model('Business',userSchema)