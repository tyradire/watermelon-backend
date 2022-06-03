const basketRouter = require('express').Router();
const {
  addBasketProduct, getBasketProducts, deleteBasketProduct, deleteOnePiece
} = require('../controllers/baskets');

basketRouter.post('/', addBasketProduct);
basketRouter.get('/', getBasketProducts);
basketRouter.delete('/', deleteBasketProduct);
basketRouter.delete('/', deleteOnePiece);

module.exports = basketRouter;