function auth(req,res,next){
    // if logged in
    if(req.isAuthenticated()){
        return next()
    }

    return res.redirect('/login')
}

module.exports = auth