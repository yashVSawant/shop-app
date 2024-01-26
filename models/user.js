const mongodb = require('mongodb');
const getDb = require('../util/database').getDb

class User {
    constructor (name,email,cart,id){
        this.name = name;
        this.email = email;
        this.cart = cart;
        this._id= id ?new mongodb.ObjectId(id):null
    }

    save(){
        const db = getDb();
        return db.collection('user')
        .insertOne(this)
        .then((result)=>{console.log(result)})
        .catch((err)=>console.log(err));
    }

    addToCart(product){
        const  cartProduct = this.cart.item.findIndex(cp=>{
            return JSON.stringify(cp._id) === JSON.stringify(product._id)
        })
        
        const newItem = this.cart.item;
        if(cartProduct!==-1){
            newItem[cartProduct].quantity = newItem[cartProduct].quantity+1
        }else{
            newItem.push({...product ,quantity: 1})
        }
        const updatedCart = {item: newItem}
        const db = getDb();
        return db.collection('user')
        .updateOne(
            {_id:new mongodb.ObjectId(this._id)},
            {$set: {cart: updatedCart}}
        )
        .catch((err)=>{console.log(err)})
        ;
    }

    getCart(userId){

    }

    static findById(id){
        const db = getDb();
        return db.collection('user')
        .findOne({_id:new mongodb.ObjectId(id)})
        .then()
        .catch((err)=>{console.log(err)})
    }
}

module.exports = User;