function cityConroller(){
    return {
        index(req,res){
          return res.render('./admin-dashboard/city/all-city')  
        }
    }
}

module.exports = cityConroller