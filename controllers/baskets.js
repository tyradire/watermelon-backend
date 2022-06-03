const { BasketProduct, Product } = require('../models/models');

const addBasketProduct = (req, res, next) => {
  const id = req.params.id;
  BasketProduct.create({productId: id, userId: req.user.id})
  .then((product) => res.status(200).send({product}))
  .catch(next);
}

const deleteBasketProduct = (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user.id;
  BasketProduct.destroy({
    where: { productId, userId }
  })
  .then((product) => res.status(200).send({product}))
  .catch(next);
}

const deleteOnePiece = (req, res, next) => {
  const productId = req.params.id;
  BasketProduct.findOne({
    where: { productId }
  })
  .then((piece) => BasketProduct.destroy({
    where: { id: piece.id }
  }))
  .then((product) => res.status(200).send({product}))
  .catch(next);
}

const getBasketProducts = (req, res, next) => {
  const userId = req.user.id;
  BasketProduct.findAll({
    where: { userId },
    include: [{model: Product}]
  })
  .then((product) => res.status(200).send({product}))
  .catch(next);
}

module.exports = {
  addBasketProduct, getBasketProducts, deleteBasketProduct, deleteOnePiece,
};