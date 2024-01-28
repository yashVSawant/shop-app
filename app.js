const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');

app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const User = require('./models/user');

// const mongoConnect = require('./util/database').mongoConnect;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req,res,next)=>{
//     User.findById('65b39d9d1176c3f1e9100653')
//     .then(user=>{
//         // console.log(user)
//         req.user = new User(user.name,user.email,user.cart,user._id)
//         next();
//     })
//     .catch((err)=>{console.log(err)})
// })

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect((client)=>{
//     console.log('connected')
//     app.listen(3000)
// })

mongoose.connect('mongodb+srv://yash:0H5MGRs1p5S68cVo@cluster0.y35knxu.mongodb.net/shop?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected')
    app.listen(3000)
})
.catch((err)=>{
    console.log("error>>>",err)
})