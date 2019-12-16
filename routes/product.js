let express = require("express");
let router = express.Router();
let Prod = require("../db/product.schema");
let Cate = require("../db/category.schema");
let subCate = require("../db/subcategory.schema");

router.post("/addProduct", async (req, res) => {
  try {
    let { error } = Prod.ValidationError(req.body);
    if (error) {
      return res.status(403).send(error.details[0].message);
    }
    let data = new Prod.Product({
      prodName: req.body.prodName,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      offerPrice: req.body.offerPrice,
      isAvailable: req.body.isAvailable,
      isTodayOffer: req.body.isTodayOffer,
      category: req.body.category,
      subCategory: req.body.subCategory
    });

    let result = await data.save();
    res.send({ message: "Product added..", item: result });
  } catch (ex) {
    res.send(ex.message);
  }
});

router.get("/allProduct", async (req, res) => {
  try {
    let result = await Prod.Product.find();
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.get("/allProduct/page/:pageIndex", async (req, res) => {
  let currentPage = req.params.pageIndex || 1;
  let perPage = 2;
  let data = await Prod.Product.find({})
    .skip(perPage * currentPage - perPage)
    .limit(perPage);
  let prodCount = await Prod.Product.find().count();
  let pageSize = Math.ceil(prodCount / perPage);
  res.send({
    perPage: perPage,
    currentPage: currentPage,
    dataSize: data,
    pageSize: pageSize
  });
});

router.get("/findProduct/:id", async (req, res) => {
  try {
    let result = await Prod.Product.findById(req.params.id);
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.put("/updateProduct/:id", async (req, res) => {
  try {
    let item = await Prod.Product.findById(req.params.id);
    if (!item) {
      return res.status(404).send({ message: "Invalid Product Id" });
    }
    let { error } = Prod.ValidationError(req.body);
    if (error) {
      return res.status(403).send(error.details[0].message);
    }
    item.prodName = req.body.prodName;
    item.image = req.body.image;
    item.description = req.body.description;
    item.price = req.body.price;
    item.offerPrice = req.body.offerPrice;
    item.isTodayOffer = req.body.isTodayOffer;
    item.category = req.body.category;
    item.subCategory = req.body.subCategory;

    let data = await item.save();
    res.send({ message: "Product updated!!", d: data });
  } catch (ex) {
    res.send(ex.message);
  }
});

router.delete("/deleteProduct/:id", async (req, res) => {
  try {
    let product = await Prod.Product.findByIdAndRemove(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Invalid Product Id" });
    }
    res.send({ message: "Product Removed" });
  } catch (ex) {
    res.send(ex.message);
  }
});

// router.get("/category/:id/page/:pageIndex", async (req, res) => {
router.get("/category/:id", async (req, res) => {
  try {
    let categoryList = await Cate.Category.findById(req.params.id);
    console.log(categoryList);
    let currentPage = req.params.pageIndex || 1;
    let perPage = 2;
    let prodList = await Prod.Product.find({ category: categoryList.name })
      .skip(perPage * currentPage - perPage)
      .limit(perPage);
    let prodCount = await Prod.Product.find({
      category: categoryList.name
    }).count();
    let pageSize = Math.ceil(prodCount / perPage);
    if (!prodList) {
      return res.status(403).send({ message: "No Product found" });
    }
    //res.send(prodList);
    res.send({
      perPage: perPage,
      currentPage: currentPage,
      prodCount: prodCount,
      dataSize: prodList,
      pageSize: pageSize
    });
  } catch (ex) {
    res.send(ex.message);
  }
});

//router.get(  "/category/:id/subcategory/:subid/page/:pageIndex", async (req, res) => {
router.get("/category/:id/subcategory/:subid", async (req, res) => {
  try {
    let subcat = await subCate.SubCategory.findById(req.params.subid);
    console.log(subcat.name);
    if (!subcat) {
      res.status(403).send({ message: "Sub Category not found" });
    }
    let currentPage = req.params.pageIndex || 1;
    let perPage = 2;

    let categoryList = await Cate.Category.findById(req.params.id);
    console.log(categoryList.name);
    if (!categoryList) {
      return res.status(403).send({ message: "Category not found" });
    }

    let prodList = await Prod.Product.find({
      category: categoryList.name,
      subCategory: subcat.name
    })
      .skip(perPage * currentPage - perPage)
      .limit(perPage);
    let prodCount = await Prod.Product.find({
      category: categoryList.name,
      subCategory: subcat.name
    }).count();
    let pageSize = Math.ceil(prodCount / perPage);
    if (!prodList) {
      return res.status(403).send({ message: "Product not found" });
    }
    console.log(prodList);

    //res.send(prodList);
    res.send({
      perPage: perPage,
      currentPage: currentPage,
      prodCount: prodCount,
      dataSize: prodList,
      pageSize: pageSize
    });
  } catch (ex) {
    res.send(ex.message);
  }
});

router.get("/offerProduct", async (req, res) => {
  try {
    let result = await Prod.Product.find({ isTodayOffer: true });
    if (!result) {
      res.status(401).send({ message: "No Product in offer" });
    }
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

module.exports = router;
