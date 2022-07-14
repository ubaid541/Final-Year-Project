const Seller = require('../../../models/seller/seller')
const B_type = require('../../../models/seller/business_type')
const B_category = require('../../../models/seller/business_category')
const City = require('../../../models/seller/city')
const bcrypt = require('bcrypt')
const passport = require('passport')
// const { body, validationResult } = require('express-validator');



function authController(){
    
    // factory method (return object)
    return {
        // method
        login(req,res){
            res.render('auth/login')
        },
        postLogin(req,res,next){
            const {email,password} = req.body
            // validate request
            if(!email || !password){
                req.flash('error','All fields must be filled.')
                return res.redirect('/login')
            }
            passport.authenticate('local',(err,seller,info)=>{
                if(err){
                    req.flash('error',info.message)
                    return next(err)
                }

                if(!seller){
                    req.flash('error',info.message)
                    return res.redirect('/login')
                }

                req.logIn(seller,()=>{
                    if(err){
                        req.flash('error',info.message)
                        return next(err)
                    }
                    return res.redirect('/admin')
                    
                })
            })(req,res,next)
        },

        async sellerRegister(req,res){
        let business_category = await B_category.find()
        let business_type = await B_type.find()
        let city = await City.find()
        
        return res.render('auth/register-seller',{
            business_category : business_category,
            business_type : business_type,
            city : city
        })
        },
        async postSellerRegister(req,res){
            const {first_name,last_name,username,email,password,phone,address,business_name,business_city,business_type,business_cat} = req.body
           
            // validate input fields
            // body('username')

            // validate empty fields
            // if(!username || !email || !password || !business_name){
            //     req.flash('error','All fields must be filled.')
            //     return res.redirect('/register-seller')
            // }

            // if email already exists
            // Seller.exists({username: username},(err,result)=>{
            //     if(result){
            //         req.flash('error','Email,username or business name already taken.')
            //         return res.redirect('/register-seller')
            //     }
            // })

            // Seller.exists({$or: [{username: {$eq : username}},{email : {$eq : email}},{business_name : {$eq : business_name}}]},(err,result)=>{
            // if(result){
            //             req.flash('error','Email,username or business name already taken.')
            //             return res.redirect('/register-seller')
                        
            //         }
            // })

            

            // Hash password
            const hashedPassword = await bcrypt.hash(password,10)

            // create a seller
            const seller = new Seller({
                fname  : first_name,
                lname : last_name,
                username : username,
                email : email,
                phone : phone,
                password : hashedPassword,
                address : address,
                business_name : business_name,
                business_city : business_city,
                business_type : business_type,
                business_category : business_cat,
                
            })

            seller.save().then((seller)=>{
                // login
                return res.redirect('/admin')
            }).catch(err => {
                req.flash('error','Something went wrong')
                console.log(err)
                return res.redirect('/register-seller')
            })
           
        },
        logout(req,res,next){
            req.logout(function(err){
                if(err){
                    return next(err)
                }
                return res.redirect('/login')
            })
            
        }


    }

}

module.exports = authController