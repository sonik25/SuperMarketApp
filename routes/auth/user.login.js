let express = require('express');
let router = express.Router();
let Joi = require('@hapi/joi');
let UserLogin = require('../../db/user.schema');
let bcrypt = require('bcryptjs');
let auth = require('../../middleware/user.auth');

router.post('/login', async(req,res) =>{
    let user = await UserLogin.User.findOne({"UserLogin.userEmail": req.body.UserLogin.userEmail});
    if(!user){ return res.status(403).send({message:'Invalid EmailId please try again' })}
    let {error} = ValidationError(req.body);
    if(error){return res.status(403).send(error.detials[0].message)}
    let password = await bcrypt.compare(req.body.UserLogin.userPassword,user.UserLogin.userPassword);
    if(!password) {return res.status(403).send({message:'invalis password'})}
    let token = user.GenerateToken();
    res.header('x-auth-token',token).send({message:'Login Successful',t:token})
});

function ValidationError(error){
    let Schema = Joi.object({
        UserLogin:{
            userEmail:Joi.string().required().email(),
            userPassword:Joi.string().required()
        }
    });
    return Schema.validate(error);
};

module.exports = router;