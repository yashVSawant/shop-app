const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData])=>{
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err=>console.log(err));
  
};

exports.getProduct = (req,res,next)=>{
  const prodId = req.params.productId;
  console.log(prodId)
  Product.findById(prodId)
  .then(([product])=>{
    //console.log(product[0])
    res.render('shop/product-detail',{
      product: product[0],
      pageTitle: product.title,
      path:'/product'
    })
  })
  .catch(err=>console.log(err));
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err=>console.log(err));
  
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart=>{
    Product.fetchAll(products =>{
      const cartProducts = [];
      for (p of products){
        const cartProductData = cart.products.find(prod => prod.id === p.id);
        if(cartProductData){
          cartProducts.push({productData:p,qty:cartProductData.qty});
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:cartProducts
      });
    })
    
  })
  
};

exports.postCart = (req,res,next)=>{
  const prodId = req.body.product;
  Product.findById(prodId,(product)=>{
    Cart.addProduct(prodId,product.price);  })
  res.redirect('/cart');
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
