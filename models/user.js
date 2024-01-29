const mongoose = require('mongoose');
const Product = require('./product')

const Schema = mongoose.Schema;

const userSchema = Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    cart:{
        items:[{
            productId:{type:Schema.Types.ObjectId,ref:'product',require:true},
            quantity:{ type:Number,require:true }
        }]
    }
})

userSchema.methods.addToCart = function (product){
        const  cartProductIndex = this.cart.items.findIndex(cp=>{
            return (cp.productId).toString() === (product._id).toString()
        })
                // console.log(cartProductIndex)  
        const newItem = this.cart.items;
        if(cartProductIndex!==-1){
            newItem[cartProductIndex].quantity = newItem[cartProductIndex].quantity+1
        }else{
            newItem.push({productId:product._id ,quantity: 1})
        }
        const updatedCart = {items: newItem}
        this.cart = updatedCart;
        return this.save()
}

userSchema.methods.getCart = function (){
        const productIds = this.cart.items.map(i=>{
            return i.productId
        })
        return Product
        .find({_id:{$in:productIds}})
        .then(product =>{
            return product.map(p=>{
                return {...p,quantity:this.cart.items.find(i=>{
                    return i.productId.toString() === p._id.toString()
                }).quantity}
            })
        })
}

userSchema.methods.deleteCartItem = function (productId){
                const newItem = this.cart.items.filter((i)=>i.productId.toString()!==productId.toString())
                const updatedCart = {items: newItem}
                this.cart = updatedCart;
                return this.save();
            
}

module.exports = mongoose.model('user',userSchema);



// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb

// class User {
//     constructor (name,email,cart,id){
//         this.name = name;
//         this.email = email;
//         this.cart = cart;
//         this._id= id ?new mongodb.ObjectId(id):null
//     }

//     save(){
//         const db = getDb();
//         return db.collection('user')
//         .insertOne(this)
//         .then((result)=>{console.log(result)})
//         .catch((err)=>console.log(err));
//     }

//     addToCart(product){
//         const  cartProductIndex = this.cart.item.findIndex(cp=>{
//             return (cp._id).toString() === (product._id).toString()
//         })
        
//         const newItem = this.cart.item;
//         if(cartProductIndex!==-1){
//             newItem[cartProductIndex].quantity = newItem[cartProductIndex].quantity+1
//         }else{
//             newItem.push({...product ,quantity: 1})
//         }
//         const updatedCart = {item: newItem}
//         const db = getDb();
//         return db.collection('user')
//         .updateOne(
//             {_id:new mongodb.ObjectId(this._id)},
//             {$set: {cart: updatedCart}}
//         )
//         .catch((err)=>{console.log(err)})
//         ;
//     }

//     getCart(){
//         const db = getDb();
//         const productIds = this.cart.item.map(i=>{
//             return i._id
//         })
//         return db.collection('product')
//         .find({_id:{$in:productIds}})
//         .toArray()
//         .then(product =>{
//             return product.map(p=>{
//                 return {...p,quantity:this.cart.item.find(i=>{
//                     return i._id.toString() === p._id.toString()
//                 }).quantity}
//             })
//         })
//     }

//     deleteCartItem(id){
//         const productId = new mongodb.ObjectId(id);
//         const newItem = this.cart.item.filter((i)=>i._id.toString()!==productId.toString())
//         const updatedCart = {item: newItem}
//         const db = getDb();
//         return db.collection('user')
//         .updateOne(
//             {_id:new mongodb.ObjectId(this._id)},
//             {$set: {cart: updatedCart}}
//         )
//         .catch((err)=>{console.log(err)});
//     }

//     addOrder(){
//         const db = getDb();
//         return this.getCart().then(products=>{
//             const order = {
//                 items:products,
//                 user:{
//                     _id: new mongodb.ObjectId(this._id),
//                     name:this.name,
//                     email:this.email
//                 }
//             }
//             return db.collection('order')
//                 .insertOne(order)
//         })
//         .then(result=>{
//             this.cart = {item :[]};
//             return db.collection('user')
//             .updateOne(
//                 {_id:new mongodb.ObjectId(this._id)},
//                 {$set :{cart :{item:[]}}}
//             )
//         })
//     }

//     getOrder(){
//         const db = getDb();
//         return db.collection('order')
//         .find({'user._id':new mongodb.ObjectId(this._id)})
//         .toArray()
//         .catch(err=>{console.log(err)})
//     }

//     static findById(id){
//         const db = getDb();
//         return db.collection('user')
//         .findOne({_id:new mongodb.ObjectId(id)})
//         .then()
//         .catch((err)=>{console.log(err)})
//     }
// }

// module.exports = User;