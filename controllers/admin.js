
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  console.log('in add')
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};


exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({title:title,price:price,imageUrl:imageUrl,description:description,userId:req.user._id})
  product.save()
  .then(result=>{
    console.log('created product');
    res.redirect('/products')
  })
  .catch(err=>console.log("we have error :s",err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  // console.log("edit",editMode)
  if(!editMode){
    console.log('no')
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(product =>{
    if(!product){
      return res.redirect('/');
    }
    // console.log(product)
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product:product
  }) 
  })
  .catch(err=>console.log(err))
};

exports.postEditProduct = (req,res,next)=>{
  const _id = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  Product.updateOne({_id:_id},{$set:{title:title,price:price,description:description,imageUrl:imageUrl}})
  .then(result=>{
    console.log('update product!')
    res.redirect('/admin/products')
  })
  .catch(err=>console.log(err))
   
}

exports.postDeleteProduct = (req,res,next)=>{
  
  const prodId = req.body.productId
    Product.deleteOne({_id:prodId})
    .then(()=>{res.redirect('/admin/products')})
    .catch(err=>console.log(err));
  
}

exports.getProducts = (req, res, next) => {
   Product.find().select('title price description').populate('userId')
  .then(products => {
    // console.log(products)

    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err=>console.log('error',err));
};
