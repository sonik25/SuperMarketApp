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
                pass:'9765053991'
            }
        });

        if(!transporter){ res.status(401).send({message:'something went wrong..'})}

        // let mailOptions = {
        //     from: ' "SN Apps:" <sonal.amberkar2511@gmail.com>'
        // }


        let info = await transporter.sendMail({
            from: '"SN Apps:" <sonal.amberkar2511@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: 'Thank you for your valuable response', // Subject line
            text: 'Thank you, Our Sales Team will Connect you soon' // plain text body
        });

        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    catch(ex){
        res.send(ex.message);
    }
});

module.exports = router;
