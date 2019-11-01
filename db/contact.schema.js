let mongoose = require('mongoose');
let Joi = require('@hapi/joi');

let ContactFormSchema = new mongoose.Schema({
    name:{type:String,required:true,minlength:3,maxlength:100},
    email:{type:String,required:true},
    message:{type:String,required:true,minlength:10}
});

let Contact = mongoose.model('CantactInfo',ContactFormSchema);
 