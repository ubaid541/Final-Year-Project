const Coupon = require('../../../models/seller/coupon')
const moment = require('moment')

function coupons(){
    return{
        async index(req,res){
            // if user role is admin
            if(req.user.role === 'admin'){
                const coupon = await Coupon.find()
                return res.render('./admin-dashboard/coupon/all-coupons',{coupon : coupon,moment : moment})
                }
                else if (req.user.role === 'seller'){
                    // else show addons based on seller id
                const coupon = await Coupon.find({seller_id : req.user._id},null,{sort : {'createdAt' : -1}})
                return res.render('./admin-dashboard/coupon/all-coupons',{coupon : coupon,moment : moment})
        }
    },
    addCoupon(req,res){
        const {coupon_name,coupon_desc,coupon_value,coupon_expired,coupon_status,seller_id} = req.body

            // create coupon
            const coupon = new Coupon({
                coupon_name,
                coupon_desc,
                coupon_value,
                coupon_expired,
                coupon_status,
                seller_id : req.user._id
            })

            coupon.save().then((coupon)=>{
                req.flash('success','Coupon added successfully.')
                return res.redirect('/coupons')
            }).catch(err=>{
                req.flash('error','Something went wrong.')
                console.log(err)
                return res.redirect('/coupons')
            })
    },
    async editCoupon(req,res){
        var id = req.params.id
        const coupon = await Coupon.find( { _id: id } )
        return res.render('./admin-dashboard/coupon/edit-coupon', {coupon : coupon,moment : moment})
    },
    async posteditCoupon(req,res){
            
        const {coupon_name,coupon_desc,coupon_value,cpn_exp_date,cpn_status,cpn_id} = req.body
        Coupon.updateOne({_id : cpn_id},{$set : {coupon_name : coupon_name,coupon_desc : coupon_desc, coupon_value : coupon_value, coupon_expired : cpn_exp_date, coupon_status : cpn_status}}).then((cat)=>{
            req.flash('success','Coupon Updated successfully.')
            return res.redirect('/coupons')
        }).catch(err=>{
            console.log(err)
        })
    },
    deleteCoupon(req,res) {
        Coupon.deleteOne({_id : req.params.id})
        .then(result=>{
            req.flash('success','Coupon deleted successfully.')
            return res.redirect('/coupons')
        })
    }
}
}
module.exports = coupons