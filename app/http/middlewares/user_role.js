function user_role(req,res,next){
    // if logged in
    if(req.isAuthenticated() && req.user.role === 'seller'){
        return next()
    }

    return res.redirect('/admin')
}

module.exports = user_role