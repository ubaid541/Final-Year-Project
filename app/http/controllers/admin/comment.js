const Comment = require('../../../models/comment')

function commentController(){
    return{
        index(req,res){
            const {name,email,comment,cutomerId} = req.body
            const comments = new Comment({
                name,
                email,
                comment,
                customerId : req.user._id
            })

            comments.save().then((addon)=>{
                req.flash('success','Comment submitted successfully.')
                return res.redirect('/')
            }).catch(err=>{
                req.flash('error','Something went wrong.')
                console.log(err)
                return res.redirect('/')
            })
        }
    }
}

module.exports = commentController