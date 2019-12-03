let express = require('express');
let router = express.Router();
// let UserInfo = require('../../db/user.schema');
// let UserCartInfo = require('../../db/usercart.schema');
let User_cart = require('../../db/cartitem.schema');

let auth = require('../../middleware/user.auth');


router.post('/addtocart',auth, async(req,res) =>{
    try{
        let {error} = User_cart.ValidationError(req.body);
        if(error){return res.status(403).send(error.details[0].message)}
        
        let cart = new User_cart.cartItem({
            prodId:req.body.prodId,
            name:req.body.name,
            image:req.body.image,
            price:req.body.price,
            quantity:req.body.quantity,
            totalPrice:req.body.totalPrice
        });

        let result = await cart.save();        

        res.send(result);
    }
    catch(ex){
        res.send(ex.message);
    }

});

router.get('/allcartitem', async(req,res) =>{
    try{
        let result = await User_cart.cartItem.find().populate('prodId');
    res.send(result);
    }
    catch(ex){
        res.send(ex.message);
    }
})

router.put('/updatetocart/:cartid', auth, async(req,res) =>{
    let item = await User_cart.cartItem.findById(req.params.cartid);
    if(!item){return res.status(404).send({message:'Invalid Product Id'})}
    let {error} = User_cart.ValidationError(req.body);
    if(error) { return res.status(403).send(error.details[0].message)}
    item.prodId = req.body.prodId;
    item.name = req.body.name;
    item.image = req.body.image;
    item.price = req.body.price;
    item.quantity = req.body.quantity;
    item.totalPrice = req.body.totalPrice;

    let data = await item.save();
    res.send(data);
});

module.exports = router;