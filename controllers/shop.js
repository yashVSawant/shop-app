const Product = require('../models/product');
// const Cart = require('../models/cart');
// const User = require('../models/user');
// const CartItem = require('../models/cart-Item')

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products =>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err=>console.log('error from shop',err))
  
};

exports.getProduct = (req,res,next)=>{
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then((products)=>{
    // console.log(products)
    res.render('shop/product-detail',{
      product: products,
      pageTitle: products.title,
      path:'/product'
    })
  })
  .catch(err=>console.log(err));
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(products =>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err=>console.log('error from shop',err))
};

// exports.getCart = (req, res, next) => {
//   req.user
//   .getCart()
//   .then(cart=>{
//     return cart
//     .getProducts()
//     .then(products=>{
//       res.render('shop/cart', {
//               path: '/cart',
//               pageTitle: 'Your Cart',
//               products:products
//             });
//     })
//   })
// };

// exports.postCart = (req,res,next)=>{
//    const prodId = req.body.product;
//    let fetchedCart;
//    let newQuantity = 1;

//    req.user
//    .getCart()
//    .then(cart=>{
//     fetchedCart = cart;
//     return cart.getProducts({where:{id:prodId}});
//    })
//    .then(products=>{
//      let product;
//      if(products.length>0){
//       product = products[0]
//      }
//      if(product){
//       const oldQuantity = product.cartItem.quantity;
//       newQuantity = oldQuantity+1 ;
//       return product;
//      }
//      return Product.findByPk(prodId)
//    })
//    .then(product => {
//     return fetchedCart.addProduct(product,{through:{quantity:newQuantity}})
//   })
//    .then(data=>{
//     res.redirect('/cart')
//   })
//   .catch(err=>console.log(err))
 
// }

// exports.postCartDeleteProduct = (req,res,next)=>{
//    const prodId = req.body.productId;
//   //  req.user.getProducts().then(p=>{
//   //   p[0].getCarts().then(c=>{
      
//   //     console.log("GOTcart:",c[0].cartItem)})
//   //  })
//   req.user.getCart()
//   .then(cart=>{
//     //console.log("output:",cart)
//     //console.log("output-Item:",cart.destroy())
    
//     return cart.getProducts({where:{id:prodId}});
//   })
//   .then(product=>{
//    product[0].cartItem.destroy()
//     //product[0].destroy()
//     res.redirect('/cart')
//   })
  
// }

// exports.getOrders = (req, res, next) => {
//   res.render('shop/orders', {
//     path: '/orders',
//     pageTitle: 'Your Orders'
//   });
// };

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// };
