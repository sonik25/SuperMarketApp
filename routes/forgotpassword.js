let express = require('express');
let router = express.Router();
let Joi = require('@hapi/joi');
let bcrypt = require('bcryptjs');
let model = require('../db/user.schema');

router.post('/forgotpassword/:id', async(req,res) =>{
    try{
    let user = await model.User.findOne({resetPasswordToken: req.params.id, 
      resetPssowordExpires:{$gte:Date.now()}});
        //let user = await model.User.findOne({resetPasswordToken: req.params.id});
        if(!user){return res.status(401).send({message:'Invalid Token'})}
        let {error} = ValidationError(req.body);
        if(error){return res.send(error.details[0].message)} 
    let comparepassword = await bcrypt.compare(req.body.UserLogin.userPassword,user.UserLogin.userPassword);
    if(!comparepassword) {return res.status(401).send({message:'this is old password make new'})}
    let salt = await bcrypt.genSalt(10);
    user.UserLogin.userPassword = await bcrypt.hash(req.body.UserLogin.userPassword, salt);
    let data = await user.save();
    res.send({message:'password updated !!', d:data})     
}
catch(ex){
    res.send(ex.message);
}
}); 

function ValidationError(message){
    let Schema = Joi.object({
        Userlogin:{
            userPassword: Joi.string().required()
        }
    });
    return Schema.validate(message);
}

module.exports = router;