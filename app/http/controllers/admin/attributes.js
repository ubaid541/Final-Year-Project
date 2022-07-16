const Attr = require('../../../models/seller/attribute')
const moment = require('moment')

function attributes(){
    return{
        async index(req,res){
             // if user role is admin
             if(req.user.role === 'admin'){
                const attr = await Attr.find()
                return res.render('./admin-dashboard/attributes/all-attributes',{attr : attr,moment : moment})
                }
                else if (req.user.role === 'seller'){
                    // else show addons based on seller id
                const attr = await Attr.find({seller_id : req.user._id},null,{sort : {'createdAt' : -1}})
                return res.render('./admin-dashboard/attributes/all-attributes',{attr : attr,moment : moment})
            }
        },addAttr(req,res){
            const {attr_name,attr_price,seller_id} = req.body

            // create addon
            const attr = new Attr({
                attr_name,
                attr_price,
                seller_id : req.user._id
            })

            attr.save().then((attr)=>{
                req.flash('success','Attribute added successfully.')
                return res.redirect('/attributes')
            }).catch(err=>{
                req.flash('error','Something went wrong.')
                console.log(err)
                return res.redirect('/attributes')
            })
        },
        async editAttr(req,res){
            var id = req.params.id
            const attr = await Attr.find( { _id: id } )
            return res.render('./admin-dashboard/attributes/edit-attr', {attr : attr})
        },
        async posteditAttr(req,res){
            
            const {attr_name,attr_price,attr_ID} = req.body
            Attr.updateOne({_id : attr_ID},{$set : {attr_name : attr_name,attr_price : attr_price}}).then((addon)=>{
                req.flash('success','Attribute Updated successfully.')
                return res.redirect('/attributes')
            }).catch(err=>{
                console.log(err)
            })
        },
        deleteAttr(req,res) {
            Attr.deleteOne({_id : req.params.id})
            .then(result=>{
                req.flash('success','Attribute deleted successfully.')
                return res.redirect('/attributes')
            })
        }
    }
}

module.exports = attributes