let express = require("express");
let router = express.Router();
let Subcat = require("../db/subcategory.schema");
let Cat = require("../db/category.schema");

router.post("/addCategory", async (req, res) => {
  try {
    let { error } = Cat.ValidationError(req.body);
    if (error) {
      return res.status(403).send(error.details[0].message);
    }

    let subcategories = await Subcat.SubCategory.find({
      _id: { $in: req.body.subcategoryId }
    });

    // let subcat = await Subcat.SubCategory.findById(req.body.subcategoryId);
    if (!subcategories) {
      return res.status(404).send("invalid subcategory Id");
    }
    let data = new Cat.Category({
      name: req.body.name,
      subCategory: subcategories
    });
    let result = await data.save();
    res.send({ message: "Product Category Created", d: result });
  } catch (ex) {
    res.send(ex.message);
  }
});

router.get("/allCategory", async (req, res) => {
  try {
    let result = await Cat.Category.find().sort("name");
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.get("/findCategory/:id", async (req, res) => {
  try {
    let result = await Cat.Category.findById(req.params.id);
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.delete("/deleteCategory/:id", async (req, res) => {
  try {
    let category = await Cat.Category.findByIdAndRemove(req.params.id);
    if (!category) {
      return res.status(404).send({ message: "Invalid category Id" });
    }
    res.send({ message: "Category Removed" });
  } catch (ex) {
    res.send(ex.message);
  }
});

module.exports = router;
