let express = require('express');
let router = express.Router();
let UserReg = require('../db/user.schema');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let auth = require('../middleware/user.auth');
let admin = require('../middleware/admin');



router.post('/userRegister', async(req,res) =>{
    try{
        let {error} = UserReg.ValidationError(req.body);
        if(error){return res.status(403).send(error.details[0].message)}
        let user = await UserReg.User.findOne({"UserLogin.userEmail":req.body.UserLogin.userEmail});
        if(user){return res.status(402).send({message:'User already exist'})}
        let data = new UserReg.User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            newsLetterCheck:req.body.newsLetterCheck,
            UserLogin:req.body.UserLogin,
            termsAcceptCheck:req.body.termsAcceptCheck
        });
        let salt = await bcrypt.genSalt(10);
        data.UserLogin.userPassword = await bcrypt.hash(data.UserLogin.userPassword, salt);
        let result = await data.save();
        let token = result.GenerateToken();
        console.log(token);
        res.header('x-auth-token', token).send({message:'Welcome User we got your data!! Lets go back to login page'});

    }
    catch(ex){
        res.send(ex.message);
    }
});

module.exports = router;