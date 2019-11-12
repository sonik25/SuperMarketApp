let mongoose = require('mongoose');
let Joi = require('@hapi/joi');
let jwt = require('jsonwebtoken');
let config = require('config');

let UserRegisterSchema = new mongoose.Schema({
    firstName:{type:String,required:true,minlength:3,maxlength:250},
    lastName:{type:String,required:true,minlength:3,maxlength:250},
    newsLetterCheck:{type:Boolean},
    UserLogin:{
        userEmail:{type:String,required:true,unique:true},
        userPassword:{type:String,required:true}
    },
    termsAcceptCheck:{type:Boolean},
    resetPasswordToken:{type:String},
    resetPssowordExpires:{type:Date},
    isAdmin:{type:Boolean},
    recordDate:{type:Date,default:Date.now},
    updatedDate:{type:Date,default:Date.now}
});

UserRegisterSchema.methods.GenerateToken = function() {
    let token = jwt.sign({_id: this._id, isAdmin:this.isAdmin } , config.get('SMapps'));
    return token;
}

let User = mongoose.model('Users', UserRegisterSchema);
function ValidationError(message){
    let Schema = Joi.object({
        firstName:Joi.string().min(3).max(250).required(),
        lastName:Joi.string().min(3).max(250).required(),
        newsLetterCheck:Joi.boolean(),
        UserLogin:{
            userEmail:Joi.string().required().email(),
            userPassword:Joi.string().required()
        },
        termsAcceptCheck:Joi.boolean()

    });

    return Schema.validate(message);
};

module.exports = {User, ValidationError};