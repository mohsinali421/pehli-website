const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
  title:{
    type: String,
    required : true
  },
  price:{
    type: Number,
    required : true
  },
  description:{
    type: String,
    required : true
  },
  imageUrl:{
    type: String,
    required : true
  }

})

module.exports = mongoose.model('Product',productSchema);



// const mongodb = require('mongodb');

// class Product {
//   constructor(title, price, description, imageUrl, id) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       // Update the product
//       dbOp = db
//         .collection('Items')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('Items').insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('Items')
//       .find()
//       .toArray()
//       .then(products => {
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection('Items')
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then(product => {
//         return product;
//       })
//       .catch(err => {
//         console.log('Error1',err);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection('Items')
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then(result => {
//         console.log('Deleted');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;
