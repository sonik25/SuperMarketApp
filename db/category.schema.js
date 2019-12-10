let mongoose = require("mongoose");
let Joi = require("@hapi/joi");
let subCatSchema = require("./subcategory.schema");
let categorySchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  subCategory: [{ type: subCatSchema.subCategorySchema, required: true }]
});

let Category = mongoose.model("Category", categorySchema);

function ValidationError(message) {
  let Schema = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .max(100),
    subcategoryId: Joi.array().required()
  });
  return Schema.validate(message);
}

module.exports = { categorySchema, Category, ValidationError };
