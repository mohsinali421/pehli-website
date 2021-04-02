const Product = require('../models/product');
 
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editingMode: false,
    isAuthenticated: req.session.isLoggedIn
  });
};
 
exports.postProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then(result => {
      console.log('Created Product');
      res.redirect('/admin/product');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.id;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        console.log('Mohsin')
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editingMode: editMode,
        pr: product,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.myId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, prodId);
  return product.save()
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/product');
    })
    .catch(err => console.log('error 2',err));
};

exports.getAdminProduct = (req, res, next) => {
  Product.fetchAll()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      res.render('admin/product', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
        isAuthenticated: req.session.isLoggedIn,
        hasProducts: true
      });
    })
    .catch(err => console.log(err));
};

exports.postdeleteProduct = (req, res, next) => {
  const prodId = req.body.thisProductId;
  Product.deleteById(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/product');
    })
    .catch(err => console.log(err));
};
