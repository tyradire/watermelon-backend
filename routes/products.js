const productRouter = require('express').Router();
const {
  createProduct, getProducts, getOneProduct
} = require('../controllers/products');

productRouter.post('/', createProduct);
productRouter.get('/', getProducts);
productRouter.get('/', getOneProduct);

module.exports = productRouter;