const mongodb = require('mongodb');
const getDb = require('../util/database').getDb

class Product{
    constructor(title, price, description, imageUrl,id){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id=new mongodb.ObjectId(id)
    }
    save(){
        const db = getDb();
        let dbOp;
        if(this._id){
            // console.log('in edit')
            dbOp = db.collection('product').updateOne({_id:this._id},{$set:this})
        }else{
            // console.log('in save')
            dbOp = db.collection('product').insertOne(this)
        }
        return dbOp
            .then(result => {
                // console.log(result)
            })
            .catch( err => {
                console.log(err)
            });
    }
    static fetchAll(){
        const db = getDb();
        return db.collection('product')
        .find()
        .toArray()
        .then(product=>{
            return product
        })
        .catch(err =>{
            console.log(err)
        });
    }
    static findById(prodId){
        const db = getDb();
        // console.log(prodId)
        return db.collection('product')
        .findOne({_id:new mongodb.ObjectId(prodId)})
        .then(product=>{
            // console.log(product)
            return product
        })
        .catch(err =>{
            console.log(err)
        });
    }
    static deleteById(prodId){
        const db = getDb();
        return db.collection('product')
        .deleteOne({_id:new mongodb.ObjectId(prodId)})
        .then((result)=>{console.log(result)})
        .catch((err)=>{console.log(err)});
    }
}

module.exports = Product;