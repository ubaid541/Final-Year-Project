function auth(req,res,next){
    // if logged in
    if(req.isAuthenticated()){
        return next()
    }

    return res.redirect('/customer-login')
}

module.exports = auth