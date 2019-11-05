let express = require('express');
let router = express.Router();
let Subcat = require('../db/subcategory.schema');

router.post('/subCategory', async(req,res) =>{
    try{
        let {error} = ValidationError(req.body);
        if(error){ return res.status(403).send(error.details[0].message)}
        let data = new Subcat.SubCategory({
            name:req.body.name
        });
        let result = await data.save();
        res.send({message:'Sub Category Created',d:result})

    }
    catch(ex){
        res.send(ex.message);
    }
});

module.exports = router;