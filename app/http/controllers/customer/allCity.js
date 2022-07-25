const City = require('../../../models/seller/city')
const Business = require('../../../models/seller/seller')

function allCity(){
    return{
        async index(req,res){
            const cities = await City.find()
            return res.render('customer/allCities',{cities : cities})
        },
        async singleCity(req,res){
            const id = req.params.id
            const city = await City.find({_id : id})
            const business = await Business.find({$and : [{business_city : id},{role : 'seller'}]}).populate('business_category')
            return res.render('customer/singleCity',{city : city, business : business})
        }
    }
}

module.exports = allCity