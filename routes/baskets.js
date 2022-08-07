const basketRouter = require('express').Router();
const {
  addBasketProduct, getBasketProducts, deleteBasketProduct, deleteOnePiece
} = require('../controllers/baskets');

basketRouter.post('/addtobasket/:id', addBasketProduct);
basketRouter.get('/getbasketproducts', getBasketProducts);
basketRouter.delete('/deletebasketproduct/:id', deleteBasketProduct);
basketRouter.delete('/deleteonepiece/:id', deleteOnePiece);

module.exports = basketRouter;