const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
   customerId : {
       type: mongoose.Schema.Types.ObjectId, 
       ref : 'Business',
       required:true
    },
  name : {type : String, required : true},
  email : {type : String, required : true},
  comment : {type : String, required : true},
}, {timestamps: true})


module.exports = mongoose.model('Comment',orderSchema)