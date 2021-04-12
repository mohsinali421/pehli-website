const mongoose = require('mongoose');
const schema = mongoose.Schema;
 
const userSchema = new schema({
    email:{
        type: String
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User',userSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').MyDb;

 
// class User{
//     constructor(email, password){
//         this.email = email;
//         this.password = password;
//     }

//     save(){
//     const db = getDb();
//      return db.collection('user').insertOne(this);
     
//     }
//     static findUserbyId(emailId){
//     const db = getDb();
//     return db
//     .collection('user')
//     .find({ email: emailId})
//     .next()
//     .then(userData => {
//       return userData;
//     })
//     .catch(err => {
//       console.log('User error 1 = ',err);
//     });
//     }
// }

// module.exports = User;
