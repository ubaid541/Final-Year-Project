const Category = require('../../../models/seller/categories')
const moment = require('moment')

function allCategories(){
    return{
        async index(req,res){
            // if user role is admin
            if(req.user.role === 'admin'){
            const category = await Category.find()
            return res.render('./admin-dashboard/categories/all-categories',{category : category,moment : moment})
            }
            else if (req.user.role === 'seller'){
                // else show addons based on seller id
            const category = await Category.find({seller_id : req.user._id},null,{sort : {'createdAt' : -1}})
            return res.render('./admin-dashboard/categories/all-categories',{category : category,moment : moment})
        }
            
        },
        addCat(req,res){
            const {cat_name,seller_id} = req.body

            // create category
            const category = new Category({
                cat_name,
                seller_id : req.user._id
            })

            category.save().then((addon)=>{
                req.flash('success','Category added successfully.')
                return res.redirect('/categories')
            }).catch(err=>{
                req.flash('error','Something went wrong.')
                console.log(err)
                return res.redirect('/categories')
            })
        },
        async editCat(req,res){
            var id = req.params.id
            const cat = await Category.find( { _id: id } )
            return res.render('./admin-dashboard/categories/edit-cat', {cat : cat})
        },
        async posteditCat(req,res){
            
            const {cat_name,cat_id} = req.body
            Category.updateOne({_id : cat_id},{$set : {cat_name : cat_name}}).then((cat)=>{
                req.flash('success','Category Updated successfully.')
                return res.redirect('/categories')
            }).catch(err=>{
                console.log(err)
            })
        },
        deleteCat(req,res) {
            Category.deleteOne({_id : req.params.id})
            .then(result=>{
                req.flash('success','Category deleted successfully.')
                return res.redirect('/categories')
            })
        }
    }
}

module.exports = allCategories