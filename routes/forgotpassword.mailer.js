let nodemailer = require('nodemailer');
let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let model = require('../db/user.schema');

router.post('/mailer', async(req,res) =>{
    try{
    let token = crypto.randomBytes(32).toString('hex');
    let User = await model.User.findOne({"UserLogin.userEmail" : req.body.UserLogin.userEmail});
    if(!User) {return await res.status(401).send({message:'Invalid EmailID'})}
    User.resetPasswordToken = token;
    resetPssowordExpires = Date.now() + 3600000;
    console.log(token);
    User = await User.save();

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
        to: User.UserLogin.userEmail,
        subject:'Reset Your Password',
        text:'open this link to change your password http://localhost:4700/forgotpassword/' + token
    };

    transporter.sendMail(mailOption, (error, info) =>{
        if(error){
            return console.log(error);
        }
        console.log('message sent: %s',info.messageId);
    });

    res.header('x-auth-token',token).status(200).send({
        'message':'Message Sent',
        'token':token,
        'data':User
    });
}
    catch(ex){
        res.status(401).send(ex);
    }
       
});


module.exports = router;