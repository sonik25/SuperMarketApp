let express = require('express');
let app = express();
let mongoose = require('mongoose');
let config = require('config');
let port = process.env.PORT || 4700;
let userRegister = require('./routes/user.register');
let contactForm = require('./routes/contact.mailer');
let userLogin = require('./routes/auth/user.login');
let forgotpasswordmailer = require('./routes/forgotpassword.mailer');
let forgotpassword = require('./routes/forgotpassword');
let subcategory = require('./routes/subcategory');
let category = require('./routes/category');
app.use(express.json());

// if(!config.get("SMapps"))
// {
//         console.log('FATAL Error: SET Enviornment Valiable');
//         process.exit(1);
// }

mongoose.connect('mongodb://localhost/SuperMarket', {useNewUrlParser:true, useUnifiedTopology:true})
        .then(() => console.log('Database Connection Successful'))
        .catch(err => console.log(`Something went wrong ${err.message}`));

app.listen(port, () => console.log(`This app is working on port no. ${port}`));

app.use('/api/supermarket/',userRegister);
app.use('/api/supermarket/',contactForm);
app.use('/api/supermarket/',userLogin);
app.use('/api/supermarket/forgotpassword/',forgotpasswordmailer);
app.use('/api/supermarket/',forgotpassword);
app.use('/api/supermarket/',subcategory);
app.use('/api/supermarket/',category);