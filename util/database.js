const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (callback) => {

    MongoClient.connect('mongodb+srv://yash:0H5MGRs1p5S68cVo@cluster0.y35knxu.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
        console.log('connected')
        db = client.db()
        callback(client)
    })
    .catch(err=>{
        console.log(err)
    })
}

const getDb = ()=>{
    if(db){
        return db
    }
    throw 'no database found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
