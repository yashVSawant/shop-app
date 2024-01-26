const mongodb = require('mongodb');
const getDb = require('../util/database').getDb

class User {
    constructor (name,email){
        this.name = name;
        this.email = email;
    }

    save(){
        const db = getDb();
        return db.collection('user')
        .insertOne(this)
        .then((result)=>{console.log(result)})
        .catch((err)=>console.log(err));
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