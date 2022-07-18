const Addon = require('../../../models/seller/addons')
const moment = require('moment')

function allAddons(){
    return{
        async index(req,res){
            // if user role is admin
            if(req.user.role === 'admin'){
            const addons = await Addon.find()
            return res.render('./admin-dashboard/addons/all-addons',{addon : addons,moment : moment})
            }
            else if (req.user.role === 'seller'){
                // else show addons based on seller id
            const addons = await Addon.find({seller_id : req.user._id},null,{sort : {'createdAt' : -1}})
            return res.render('./admin-dashboard/addons/all-addons',{addon : addons,moment : moment})
        }
            
        },
        addAddons(req,res){
            const {addon_name,addon_price,seller_id} = req.body

            //  // validate empty fields
            //  if(!addon_name || !addon_price){
            //     req.flash('error','All fields must be filled.')
            //     return res.redirect('/addons')
            // }

            // // if addon already exists
            // Addon.exists({addon_name : addon_name},(err,result)=>{
            //     if(result){
            //         req.flash('error','Not added. Addon already exist.')
            //         return res.redirect('/addons')
            //     }
            // })

            // create addon
            const addon = new Addon({
                addon_name,
                addon_price,
                seller_id : req.user._id
            })

            addon.save().then((addon)=>{
                req.flash('success','Addon added successfully.')
                return res.redirect('/addons')
            }).catch(err=>{
                req.flash('error','Something went wrong.')
                console.log(err)
                return res.redirect('/addons')
            })
        },
        async editAddon(req,res){
            var id = req.params.id
            const addon = await Addon.find( { _id: id } )
            return res.render('./admin-dashboard/addons/edit-addon', {addon : addon})
        },
        async posteditAddon(req,res){
            
            const {addon_name,addon_price,addon_ID} = req.body
            Addon.updateOne({_id : addon_ID},{$set : {addon_name : addon_name,addon_price : addon_price}}).then((addon)=>{
                req.flash('success','Addon Updated successfully.')
                return res.redirect('/addons')
            }).catch(err=>{
                console.log(err)
            })
        },
        deleteAddon(req,res) {
            Addon.deleteOne({_id : req.params.id})
            .then(result=>{
                req.flash('success','Addon deleted successfully.')
                return res.redirect('/addons')
            })
        }
    }
}

module.exports = allAddons