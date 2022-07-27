const express = require("express")
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()
const flash = require('express-flash')
const session = require('express-session')
const MongoDbStore = require('connect-mongodb-session')(session)
const passport = require('passport')



const app = express()

// database connnection
const url = 'mongodb://localhost/fatafut_mungwaen';

mongoose.connect(url , {useNewUrlParser : true},(error)=>{
    if(!error){
        console.log("Database connected successfully.");
    }else{
        console.log("Not connected.");
    }
});


// session store
let mongoStore = new MongoDbStore({
    uri: url,
    collection: 'sessions'
})

// session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24} //24 hours
}))


// passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())

// set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

// Assets
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// global middleware
app.use((req,res,next)=>{
    res.locals.user = req.user
    res.locals.session = req.session
    // pass the request
    next()
})

// routes 
require('./routes/web')(app)

const PORT = process.env.PORT || 3010
const server = app.listen(PORT,(err)=>{
    if(!err){
        console.log(`Server started at port ${PORT}`)
    }
})