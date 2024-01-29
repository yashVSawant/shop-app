const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');
// const CartItem = require('../models/cart-Item')

exports.getProducts = (req, res, next) => {
  Product.find()
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
  .then((product)=>{
    // console.log(products)
    res.render('shop/product-detail',{
      product: product,
      pageTitle: product.title,
      path:'/product'
    })
  })
  .catch(err=>console.log(err));
}

exports.getIndex = (req, res, next) => {
  Product.find()
  .then(products =>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err=>console.log('error from shop',err))
};

exports.getCart = (req, res, next) => {
  req.user
  .populate('cart.items.productId')
    .then(user=>{
      const products = user.cart.items;
      res.render('shop/cart', {
              path: '/cart',
              pageTitle: 'Your Cart',
              products:products
            });
    })
    .catch(err=>{console.log(err)})
  
};

exports.postCart = (req,res,next)=>{
   const prodId = req.body.product;
   Product.findById(prodId).then((product)=>{
    req.user.addToCart(product)
   .then(()=>{
        res.redirect('/cart')
      })
   })
   .catch(err=>{console.log(err)})

 
}

exports.postCartDeleteProduct = (req,res,next)=>{
  const prodId = req.body.productId;
  req.user.deleteCartItem(prodId)
  .then(() => {
    res.redirect('/cart')
  })
  
}

exports.getOrders = (req, res, next) => {
  Order.find()
  .then(order=>{
    // order.forEach((o)=>{o.product.forEach((p)=>{
    //   console.log(p.product)
    // })})
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders:order
      });
    })
    .catch(err=>{console.log(err)})
};

exports.postOrder = (req,res)=>{
  req.user
  .populate('cart.items.productId')
    .then(user=>{
      const products = user.cart.items.map(i=>{
        return {quantity: i.quantity,product:{...i.productId._doc}}
      });
      const order = new Order({
        user:req.user,
        product: products
     });
     req.user.cart.items = [];
     req.user.save();
     return order.save()
    })
    .then(user=>{
      res.redirect('/orders');
    })
    .catch(err=>{console.log(err)})
}

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// };
