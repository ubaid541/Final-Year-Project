const City = require('../../../models/seller/city')
const Customer = require('../../../models/seller/seller')
const bcrypt = require('bcrypt')
const passport = require('passport')


function authController(){
    return{
        index(req,res){
            return res.render('./customer/auth/login-customer')
        },
        async registerCustomer(req,res){
            let city = await City.find()
            return res.render('./customer/auth/register-customer',{
                city : city
            })
        },
        postCustomerLogin(req,res,next){
            const {email,password} = req.body
            // validate request
            if(!email || !password){
                req.flash('error','All fields must be filled.')
                return res.redirect('/customer-login')
            }
            passport.authenticate('local',(err,seller,info)=>{
                if(err){
                    req.flash('error',info.message)
                    return next(err)
                }

                if(!seller ){
                    req.flash('error',info.message)
                    return res.redirect('/customer-login')
                }

                req.logIn(seller,()=>{
                    if(err){
                        req.flash('error',info.message)
                        return next(err)
                    }
                    return res.redirect('/')
                    
                })
            })(req,res,next)
        },
        async postCustomerRegister(req,res){
            const {first_name,last_name,username,email,password,phone,address,city,role} = req.body   

            // Hash password
            const hashedPassword = await bcrypt.hash(password,10)

            // create a seller
            const customer = new Customer({
                fname : first_name , 
                lname : last_name ,
                username : username ,
                email : email ,
                phone : phone ,
                password : hashedPassword,
                address : address,
                business_city : city ,
                role : role              
            })

            customer.save().then((seller)=>{
                // login
                return res.redirect('/customer-login')
            }).catch(err => {
                req.flash('error','Something went wrong')
                console.log(err)
                return res.redirect('/register-customer')
            })
        },
        logout(req,res,next){
            req.logout(function(err){
                if(err){
                    return next(err)
                }
                return res.redirect('/customer-login')
            })
            
        }
    }
}

module.exports = authController