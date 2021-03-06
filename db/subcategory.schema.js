let mongoose = require('mongoose');
let Joi = require('@hapi/joi');
let subCategorySchema = new mongoose.Schema({
    name:{type:String,required:true,minlength:2,maxlength:100}
});

let SubCategory = mongoose.model('SubCategory',subCategorySchema);

function ValidationError(message){
    let Schema = Joi.object({
        name:Joi.string().required().min(2).max(100)
    });
    return Schema.validate(message);
}

module.exports = {subCategorySchema,SubCategory,ValidationError};