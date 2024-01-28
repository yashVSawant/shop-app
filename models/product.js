const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = Schema({
    title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    imageUrl:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model('product',productSchema);


// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb

// class Product{
//     constructor(title, price, description, imageUrl,id,userId){
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id= id ? new mongodb.ObjectId(id):null;
//         this.userId =userId;
//     }
//     save(){
//         const db = getDb();
//         let dbOp;
//         // console.log(this)
//         if(this._id){
//             // console.log('in edit')
//             dbOp = db.collection('product').updateOne({_id:this._id},{$set:this})
//         }else{
//             // console.log('in save')
//             dbOp = db.collection('product').insertOne(this)
//         }
//         return dbOp
//             .then(result => {
//                 console.log(result)
//             })
//             .catch( err => {
//                 console.log(err)
//             });
//     }
//     static fetchAll(){
//         const db = getDb();
//         return db.collection('product')
//         .find()
//         .toArray()
//         .then(product=>{
//             return product
//         })
//         .catch(err =>{
//             console.log(err)
//         });
//     }
//     static findById(prodId){
//         const db = getDb();
//         return db.collection('product')
//         .findOne({_id:new mongodb.ObjectId(prodId)})
//         .then(product=>{
//             return product
//         })
//         .catch(err =>{
//             console.log(err)
//         });
//     }
//     static deleteById(prodId){
//         const db = getDb();
//         return db.collection('product')
//         .deleteOne({_id:new mongodb.ObjectId(prodId)})
//         .then((result)=>{console.log(result)})
//         .catch((err)=>{console.log(err)});
//     }
// }

// module.exports = Product;