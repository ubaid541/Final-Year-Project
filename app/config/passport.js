const LocalStrategy = require('passport-local').Strategy
const Seller = require('../models/seller/seller')
const bcrypt = require('bcrypt')


function init(passport){
    passport.use(new LocalStrategy({usernameField : 'email'},async(email,password,done)=>{
        const seller  = await Seller.findOne({email: email})
        if(!seller){
            return done(null,false,{message : 'No user with this email'})
        }

        // compare password
        bcrypt.compare(password,seller.password).then(match=>{
            if(match){
                return done(null,seller,{message: 'Logged in successfully'})
            }

            return done(null,false,{message: 'Incorrect credentials.'})
        }).catch(err=>{
            return done(null,false,{message: 'Something went wrong.'})
        })
    }))

    // save user info in session
    passport.serializeUser((seller,done)=>{
        done(null, seller._id)
    })

    // access session
    passport.deserializeUser((id,done)=>{
        Seller.findById(id,(err,seller)=>{
            done(err,seller)
        })
    })
}

module.exports = init