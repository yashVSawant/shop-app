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
  const product = new Product(title,price,imageUrl,description)
  product.save()
  .then(result=>{
    console.log('created product');
    res.redirect('/products')
  })
  .catch(err=>console.log("we have error :s",err));
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   console.log("edit",editMode)
//   if(!editMode){
//     console.log('no')
//     return res.redirect('/');
//   }
//   const prodId = req.params.productId;
//   req.user.getProducts({where:{id:prodId}})
//   .then(product =>{
//     if(!product[0]){
//       return res.redirect('/');
//     }
//     res.render('admin/edit-product', {
//       pageTitle: 'Edit Product',
//       path: '/admin/edit-product',
//       editing: editMode,
//       product:product[0]
//   }) 
//   })
//   .catch(err=>console.log(err))
// };

// exports.postEditProduct = (req,res,next)=>{
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;
//   Product.findAll({where:{id:prodId}})
//   .then(product=>{
//     product[0].title = updatedTitle;
//     product[0].Price = updatedPrice;
//     product[0].description = updatedDesc;
//     product[0].imageUrl = updatedImageUrl;
//     return product[0].save();

//   })
//   .then(result=>{
//     console.log('update product!')
//     res.redirect('/admin/products')
//   })
//   .catch(err=>console.log(err))
   
// }

// exports.postDeleteProduct = (req,res,next)=>{
  
//   const prodId = req.body.productId
//     Product.findAll({where:{id:prodId}})
//     .then(product=>{
//       return product[0].destroy();
//     })
//     .then(()=>{res.redirect('/admin/products')})
//     .catch(err=>console.log(err));
  
// }

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err=>console.log('error',err));
};
