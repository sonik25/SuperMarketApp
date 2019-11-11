let express = require('express');
let router = express.Router();
let Joi = require('@hapi/joi');
let UserInfo = require('../../db/user.schema');
let UserCartInfo = require('../../db/usercart.schema');
let auth = require('../../middleware/user.auth');


router.post('/addtocart', async(req,res) =>{
    let {error} = UserCartInfo.ValidationError(req.body);
    
})