let mongoose = require('mongoose');
let Joi = require('@hapi/joi');
let imageSchema = new mongoose.Schema({
    imgUrl:{type:String,required:true}
})

let Image = mongoose.model('image',imageSchema);

function ValidationError(message){
    let Schema = Joi.object({
        imgUrl:Joi.string().required()
    });

    return Schema.validate(message);
}

module.exports = {Image,ValidationError}