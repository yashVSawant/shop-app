const Product = require('../models/product');
const Cart = require('../models/cart');
const User = require('../models/user');
const CartItem = require('../models/cart-Item')

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  console.log('id',prodId)
  Product.findAll({where:{id:prodId}})
  .then((products)=>{
    res.render('shop/product-detail',{
      product: products[0],
      pageTitle: products[0].title,
      path:'/product'
    })
  })
  .catch(err=>console.log(err));
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
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
  .getCart()
  .then(cart=>{
    return cart
    .getProducts()
    .then(products=>{
      res.render('shop/cart', {
              path: '/cart',
              pageTitle: 'Your Cart',
              products:products
            });
    })
  })
  // Cart.getCart(cart=>{
  //   Cart.findAll()
  //   .then(products =>{
  //     const cartProducts = [];
  //     for (p of products){
  //       console.log(p[0])
  //       const cartProductData = Product.findAll({where:{id:}})
  //       if(cartProductData){
  //         cartProducts.push({productData:p,qty:cartProductData.qty});
  //       }
  //     }
  //    
  //   })
    
  // })
  
};

exports.postCart = (req,res,next)=>{
   const prodId = req.body.product;
   let fetchedCart;
   req.user
   .getCart()
   .then(cart=>{
    fetchedCart = cart;
    return cart.getProducts({where:{id:prodId}});
   })
   .then(products=>{
     let product;
     if(products.length>0){
      product = products[0]
     }
     let newQuantity = 1;
     if(product){
      Product.findAll({where:{id:prodId}})
      .then(p=>{
        return CartItem.findAll({where:{id:1}}).then(p=>{
          const qty = p[0].quantity
          console.log(qty)
          fetchedCart.addProduct(product,{through:{quantity:qty+1}})
        })
        
      })
     }
     return Product.findAll({where:{id:prodId}})
     .then(product => {
       return fetchedCart.addProduct(product,{through:{quantity:newQuantity}})
     })
     .then(product=>{
      console.log("product",product)
      res.redirect('/cart')
    })
   })
  // Product.findAll()
  // .then(prodId,(product)=>{
  //   Cart.addProduct(prodId,product.price);  
  // })
 
}

exports.postCartDeleteProduct = (req,res,next)=>{
  const prodId = req.body.productId;
  Product.findById(prodId, product=>{
    Cart.deleteProduct(prodId,product.price);
    res.redirect('/cart');
  })
  
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
