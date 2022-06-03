const { Like } = require('../models/models');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const addLike = (req, res, next) => {
  const id = req.params.id;
  console.log('ПОЛЬЗОВАТЕЛЬ: ', req.user.id)
  console.log('Лайк: ', req.user)
  Like.findOne({
    where: { 
      productId: id,
      userId: req.user.id 
    }
  })
  .then((like) => {
    console.log(like)
    if (like) throw new ConflictError('Лайк уже поставлен');
    return id;
  })
  .then((res) => Like.create({
    productId: id, 
    userId: req.user.id
  }))
  .then((item) => res.status(200).send({item}))
  .catch(next)
}

const deleteLike = (req, res, next) => {
  const id = req.params.id
  Like.destroy({
    where: { 
      productId: id,
      userId: req.user.id
    }
  })
  .then((item) => res.status(200).send({item}))
  .catch(next);
}

const getLikes = (req, res, next) => {
  const id = req.user.id;
  Like.findAll({
    where: { userId: id }
  })
  .then((user) => {
    if (!user) throw new NotFoundError('Пользователь с указанным id не найден')
    console.log(user)
    res.status(200).send(user.map(like => like.productId))
  })
  .catch(next);
}

module.exports = {
  addLike, deleteLike, getLikes,
};