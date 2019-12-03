let mongoose = require('mongoose');
let Joi = require('@hapi/joi');

let productSchema = new mongoose.Schema({
    prodName:{type:String,required:true,minlength:3,maxlength:100},
    image:{type:String,required:true,minlength:3,maxlength:100},
    description:{type:String,required:true,minlength:3,maxlength:1000},
    price:{type:Number,required:true,minlength:1},
    offerPrice:{type:Number,required:true,minlength:1},
    isAvailable:{type:Boolean,required:true},
    isTodayOffer:{type:Boolean,required:true},
    category:{type:String,required:true,minlength:2,maxlength:100},
    subCategory:{type:String,required:true,minlength:2,maxlength:100},
    isAdmin:{type:Boolean},
    recordDate:{type:Date,default:Date.now()},
    updatedDate:{type:Date,default:Date.now()}
});

let Product = mongoose.model('Product',productSchema);

function ValidationError(message){
    let Schema = Joi.object({
        prodName:Joi.string().required().min(3).max(100),
        image:Joi.string().required().min(3).max(100),
        description:Joi.string().required().min(3).max(1000),
        price:Joi.number().required().min(1),
        offerPrice:Joi.number().required().min(1),
        isAvailable:Joi.boolean().required(),
        isTodayOffer:Joi.boolean().required(),
        category:Joi.string().required().min(2).max(100),
        subCategory:Joi.string().required().min(2).max(100)        
    });

    return Schema.validate(message);
}

module.exports = {Product,ValidationError,productSchema}