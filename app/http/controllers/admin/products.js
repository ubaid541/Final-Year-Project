const Product = require('../../../models/seller/products')
const Category = require('../../../models/seller/categories')
const Attribute = require('../../../models/seller/attribute')
const Addon = require('../../../models/seller/addons')
const Coupon = require('../../../models/seller/coupon')
const multer = require('multer')
const moment = require('moment')
const path = require('path')
const fs = require('fs')

function productController(){
    return{
       async index(req,res){
            // if user role is admin
            if(req.user.role === 'admin'){
                const products = await Product.find().populate(['pro_category','seller_id'])
                return res.render('./admin-dashboard/products/all-products',{product : products,moment : moment})
                }
                else if (req.user.role === 'seller'){
                    // else show addons based on seller id
                const products = await Product.find({seller_id : req.user._id},null,{sort : {'createdAt' : -1}}).populate(['pro_category','seller_id'])
                return res.render('./admin-dashboard/products/all-products',{product : products,moment : moment})
        }
    },
   async addProduct(req,res){

    let category = await Category.find({seller_id : req.user._id},null,{sort : {'createdAt' : -1}})
    let attribute = await Attribute.find({seller_id : req.user._id},null,{sort : {'createdAt' : -1}})
    let addon = await Addon.find({seller_id : req.user._id},null,{sort : {'createdAt' : -1}})
    let coupon = await Coupon.find({seller_id : req.user._id},null,{sort : {'createdAt' : -1}})
        
        return res.render('./admin-dashboard/products/add-product',{
            category : category,
            attribute : attribute,
            addon : addon,
            coupon : coupon,
        })
    },
    async postAddProduct(req,res){
        // image upload
        var storage = multer.diskStorage({
            destination : function(req,file,cb){
                cb(null,"./public/images")
            },
            filename : function(req,file,cb){
                cb(null,file.fieldname + "_" + Date.now() + "_" + file.originalname)
            }
        })

        var upload = multer({
            storage : storage,

            fileFilter: (req, file, cb) => {
                if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                  cb(null, true);
                } else {
                  cb(null, false);
                }
              },
              limits : {fileSize : 2097152}
        }).single("pro_image")

        upload(req,res,(err)=>{
            if(err){
                console.log(err)
            }
            else{
                const product = new Product({
                    pro_name : req.body.pro_name,
                    pro_desc : req.body.pro_desc,
                    pro_price : req.body.pro_price, 
                    discount : req.body.discount,
                    pro_addon : req.body.pro_addon,
                    pro_attr : req.body.pro_attr,
                    pro_category : req.body.pro_category,
                    pro_image : req.file.filename,
                    seller_id : req.user._id
                })

                product.save().then((product)=>{
                    req.flash('success','Product added successfully.')
                    return res.redirect('/products')
                }).catch(err=>{
                    req.flash('error','Something went wrong.')
                    console.log(err)
                    return res.redirect('/products')
                })
            }
        })
    },
    async editProduct(req,res){
            var id = req.params.id
            let category = await Category.find({ seller_id: req.user._id })
            let addon = await Addon.find({ seller_id: req.user._id })
            let attr = await Attribute.find({ seller_id: req.user._id })
            let coupon = await Coupon.find({ seller_id: req.user._id })

            const product = await Product.find( { _id: id } )
            return res.render('./admin-dashboard/products/edit-product', {
                product : product,
                category : category,
                addon : addon,
                attr : attr,
                coupon : coupon
            })
        },
        async posteditProduct(req,res){

                // image upload
        var storage = multer.diskStorage({
            destination : function(req,file,cb){
                cb(null,"./public/images")
            },
            filename : function(req,file,cb){
                cb(null,file.fieldname + "_" + Date.now() + "_" + file.originalname)
            }
        })

        var upload = multer({
            storage : storage,
            fileFilter: (req, file, cb) => {
                if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                  cb(null, true);
                } else {
                  cb(null, false);
                }
              },
              limits : {fileSize : 2097152}
        }).single("new_pro_image")

        upload(req,res,(err)=>{
            if(err){
                console.log(err)
            }
            else{


               let pro_id = req.body.pro_id
                Product.updateOne({_id : pro_id},
                    {
                    $set : {
                    pro_name : req.body.pro_name,
                    pro_desc : req.body.pro_desc,
                    pro_price : req.body.pro_price,
                    discount : req.body.pro_discount,
                   pro_category : req.body.pro_cat,
                   pro_addon : req.body.pro_addon,
                   pro_attr : req.body.pro_attr,
                   pro_image : req.file.filename,
    
                }}).then((product)=>{
                    req.flash('success','Product Updated successfully.')
                    return res.redirect('/products')
                }).catch(err=>{
                    console.log(err)
                })

                
            }
        })

            

        },
    async deleteProduct(req,res) {
        var product_id = req.params.pid
        const product = await Product.find({_id : product_id})
       const pro_image = product.map(product => product.pro_image)
        var path = "./public/images/" + pro_image
        fs.unlinkSync(path)
        Product.deleteOne({_id : product_id})
        .then(result=>{
            req.flash('success','Product deleted successfully.')
            return res.redirect('/products')
        })
    }
}

}

module.exports = productController