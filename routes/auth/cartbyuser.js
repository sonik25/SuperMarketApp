let express = require('express');
let router = express.Router();
let Cartuser = require('../../db/usercart.schema');
let UserInfo = require('../../db/user.schema');
let Itemcart = require('../../db/cartitem.schema');

router.post('/cartbyuser',async(req,res) =>{
    try{
        let {error} = Cartuser.ValidationError(req.body);
        if(error){ return res.status(403).send(error.details[0].message)}

        let user = await UserInfo.User.findOne({"UserLogin.userEmail":req.body.userEmail});
        if(!user) {return res.status(401).send({message:'this email is not registered'})}

        let item = await Itemcart.cartItem.findById(req.body.userCartItemId);
        if(!item) {return res.status(404).send('invalid cart itemid')}
        let cart = new Cartuser.userCart({
            userEmail:req.body.userEmail,
            userCartItem:{
                _id:item._id,
                prodId:item.prodId,
                name:item.name,
                image:item.image,
                price:item.price,
                quantity:item.quantity,
                totalPrice:item.totalPrice
            }
        }); 
        let data = await cart.save();
        res.send({message:'we got cart by user', d:data});  

    }
    catch(ex){
        res.send(ex.message);
    }
});

router.get('/allusercart',async(req,res) =>{
    try{
        data = await Cartuser.userCart.find();
        res.send(data);
    }
    catch(ex){
        res.send(ex.message); 
    }
});

router.delete('/removefromcart/:emailid', async(req,res) =>{
    try{
        let item = await Cartuser.userCart.find({'userEmail':req.params.emailid});
        if(!item) {return res.status(404).send({message:'Invalis Email or Cart item not found'})}
        res.send({mesage:'Cart Removed'});
    }
    catch(ex){
        res.send(ex.message);
    }
})

module.exports = router

