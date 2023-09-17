const test = require('../models/test')

class AbcController{
    index(req,res){
        test.find({},function (err, test){
            if(!err) res.json(test)
            res.status(400).json({err : 'error'})
        }) 
    }
}

module.exports = new AbcController