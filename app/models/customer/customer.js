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
    role : {type: String, default: 'customer'},
    city : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'city',
        required:true
    }
 }, {timestamps: true})

module.exports = mongoose.model('Customer',userSchema)