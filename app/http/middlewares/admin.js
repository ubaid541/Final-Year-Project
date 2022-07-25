function admin(req,res,next){
    // if logged in
    if(req.isAuthenticated() && req.user.role === 'admin'){
        return next()
    }

    return res.redirect('/admin')
}

module.exports = admin