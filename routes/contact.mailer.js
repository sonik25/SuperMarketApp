let nodemailer = require('nodemailer');
let express = require('express');
let router = express.Router();
let ContactInfo = require('../db/contact.schema');

router.post('/contactMail', async (req,res) =>{
    try{
        let {error} = ContactInfo.ValidationError(req.body);
        if(error){ return res.status(403).send(error.details[0].message)}
        let data = new ContactInfo.Contact({
            name:req.body.name,
            email:req.body.email,
            message:req.body.message
        });

        let result = await data.save();
        console.log(result);

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:{
                user: 'sonal.amberkar2511@gmail.com', 
                pass: 'Nik@123456'
            }
        });

        if(!transporter) res.status(401).send({
            message:'Something went Wrong'
        });
        
        let mailOption = {
            from:'"SN Apps: Sweet_smile:" <sonal.amberkar2511@gamil.com>',
            to: data.email,
            subject:'Contact Mail',
            text:'Thank you for Contacting Us..'
        };
        
        transporter.sendMail(mailOption, (error, info) =>{
            if(error){
                return console.log(error);
            }
            console.log('message sent: %s',info.messageId);
        });
        
         res.send({message:"message send"})
        // Preview only available when sending through an Ethereal account
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    catch(ex){
        res.send(ex.message);
    }
});

module.exports = router;
