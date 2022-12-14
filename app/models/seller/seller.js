const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fname : {type: String },
    lname : {type: String },
    username : {type: String,unique: true},
    email : {type: String, unique: true},
    phone : {type: Number},
    password : {type: String },
    address : {type: String },
    role : {type: String},
    business_name : {type: String, sparse : true},
    business_city : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'city',
    },
    business_type : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'business_type',
    },
    business_category : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'business_category',
    },
    table : {
        type : String
    }
 }, {timestamps: true})

module.exports = mongoose.model('Business',userSchema)