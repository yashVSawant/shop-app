// const Cart = require('./cart');
// const db = require('../util/database');

// module.exports = class Product {
//   constructor(id,title, imageUrl, description, price) {
//     this.id= id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = parseInt(price);
//   }

// save() {
//    return db.execute('INSERT INTO products (title, price , imageUrl , description) values(?,?,?,?)',
//    [this.title,this.price,this.imageUrl,this.description]) 
//   }
// static deleteById(id){
//   console.log(this.id)
//    return db.execute('DELETE FROM products where id=?',[id]);
//   }

// static fetchAll() {
//    return db.execute('SELECT * FROM products')
//   }

// static findById(id){
//     return db.execute('SELECT * FROM products where products.id = ?',[id])
//   }
  
// };

const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allwNull:false,
    primaryKey:true
  },
  title : Sequelize.STRING,
  Price:{
    type:Sequelize.DOUBLE,
    allowNull:false
  },
  imageUrl:{
    type:Sequelize.STRING,
    allowNull:false
  },
  description:{
    type:Sequelize.STRING,
    allowNull:false
  }
});
module.exports = Product;