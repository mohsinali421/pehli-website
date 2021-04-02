const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
    mongoClient.connect('mongodb+srv://mypc:12345@crudapp.2y28t.mongodb.net/Shop?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Database Connected');
        _db = client.db();
        
      //  console.log(client);
        cb(client);
    })
    .catch(err => {
        console.log('Databse not connected and Error is = ',err);
    }) 
}

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No Database found!';
}

exports.MymongoConnect = mongoConnect;
exports.MyDb = getDb;