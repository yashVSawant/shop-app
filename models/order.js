const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = Schema({
    product:[{
        product:{type:Object,ref:'product',require:true},
        quantity:{ type:Number,require:true }
    }],
    user:{
        userId:{type:Schema.Types.ObjectId,ref:'user',require:true},
        name:{type:Schema.Types.String}
    }
})

module.exports = mongoose.model('order',orderSchema);




// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Cart = sequelize.define('cart',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     }
// });

// module.exports = Cart;