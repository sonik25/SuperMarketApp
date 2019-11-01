let mongoose = require('mongoose');
let Joi = require('@hapi/joi');

let ContactFormSchema = new mongoose.Schema({
    name:{type:String,required:true,minlength:3,maxlength:100},
    email:{type:String,required:true},
    message:{type:String,required:true,minlength:10}
});

let Contact = mongoose.model('CantactInfo',ContactFormSchema);

function ValidationError(message){
    let Schema = Joi.object({
        name:Joi.string().required().min(3).max(100),
        email:Joi.string().required(),
        message:Joi.string().required().min(10)
    });

    return Schema.validate(message);
};

module.exports = {Contact,ValidationError};