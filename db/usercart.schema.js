let mongoose = require('mongoose');
let Joi = require('@hapi/joi');
let cartItemSchema = require('./cartitem.schema');

let UserCartSchema = new mongoose.Schema({
    userEmail:{type:String,required:true,minlength:3,maxlength:100},
    userCartItem:{type:cartItemSchema.cartItemSchema,required:true}
});

let userCart = mongoose.model('userCart',UserCartSchema);

function ValidationError(message){
    let Schema = Joi.object({
        userEmail:Joi.string().required().min(3).max(100),
        userCartItemId:Joi.string().required()
    })
    return Schema.validate(message);
};

module.exports = {userCart,ValidationError,UserCartSchema};