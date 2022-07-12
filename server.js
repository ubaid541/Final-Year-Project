const express = require("express")
const expressLayout = require('express-ejs-layouts')
const path = require('path')
require('dotenv').config()


const app = express()

// set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

// Assets
app.use(express.static('public'))

// routes 
// require('./routes/web')(app)

const PORT = process.env.PORT || 3010
const server = app.listen(PORT,(err)=>{
    if(!err){
        console.log(`Server started at port ${PORT}`)
    }
})