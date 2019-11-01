let express = require('express');
let app = express();
let mongoose = require('mongoose');
let port = process.env.PORT || 4700;
let userRegister = require('./routes/user.register');
let contactForm = require('./routes/contact.mailer');
app.use(express.json());

mongoose.connect('mongodb://localhost/SuperMarket', {useNewUrlParser:true, useUnifiedTopology:true})
        .then(() => console.log('Database Connection Successful'))
        .catch(err => console.log(`Something went wrong ${err.message}`));

app.listen(port, () => console.log(`This app is working on port no. ${port}`));

app.use('/api/supermarket/',userRegister);
app.use('/api/supermarket/',contactForm);