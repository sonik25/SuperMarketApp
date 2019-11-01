let jwt = require('jsonwebtoken');
let config = require('config');
function UserAuth(req,res,next){
    try {
        let token = req.header('x-auth-token');
        if(!token){ return res.status(402).send({ message:'Access Denied, there is no token'})}
        let dcode = jwt.verify(token, config.get('SMapps'));
        req.user = dcode;
        next();
    }
    catch(ex){
        res.status(401).send({ message:'invalid userid' + ex.message});
    }
};

module.exports = UserAuth;