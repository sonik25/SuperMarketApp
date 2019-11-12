let mongoose = require('mongoose');
let Joi = require('@hapi/joi');

let cartItemSchema = new mongoose.Schema({
    prodId:{ type:String, required:true, minlength:1,maxlength:100},
    name:{ type:String, required:true, minlength:3,maxlength:100},
    image:{ type:String, required:true, minlength:3,maxlength:100},
    price:{ type:Number, required:true, minlength:1,maxlength:10},
    quantity:{ type:Number, required:true, minlength:1,maxlength:10},
    totalPrice:{type:Number, required:true, minlength:1,maxlength:10},
    recordDate:{type:Date,default:Date.now()},
    updatedDate:{type:Date,default:Date.now()}
});

let cartItem = mongoose.model('cartItem',cartItemSchema);

function ValidationError(message){
    let Schema = Joi.object({
        prodId:Joi.string().required().min(1).max(100),
        name:Joi.string().required().min(3).max(100),
        image:Joi.string().required().min(3).max(100),
        price:Joi.number().required(),
        quantity:Joi.number().required().min(1).max(10),
        totalPrice:Joi.number().required()
    });

    return Schema.validate(message)
};

module.exports = {cartItemSchema, cartItem, ValidationError}