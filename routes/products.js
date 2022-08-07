const productRouter = require('express').Router();
const {
  createProduct, getProducts, getOneProduct
} = require('../controllers/products');

productRouter.post('/addproduct', createProduct);
productRouter.get('/getproducts', getProducts);
productRouter.get('/getone/:id', getOneProduct);

module.exports = productRouter;