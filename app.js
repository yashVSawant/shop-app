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

app.use((req,res,next)=>{
    User.findById('65b6622bc6b522cd7991e0ef')
    .then(user=>{
        // console.log(user)
        req.user = user
        next();
    })
    .catch((err)=>{console.log(err)})
})

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
    User.findOne().then(isUser=>{
        if(!isUser){
            const newUser = new User({name:"yash",email:"yash@gmail.com",cart:{item:[]}})
            newUser.save()
        }
    })
    app.listen(3000)
})
.catch((err)=>{
    console.log("error>>>",err)
})