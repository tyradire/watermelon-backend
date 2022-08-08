const productRouter = require('express').Router();
const {
  createProduct
} = require('../controllers/products');

productRouter.post('/addproduct', createProduct);


module.exports = productRouter;