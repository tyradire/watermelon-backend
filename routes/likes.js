const likeRouter = require('express').Router();
const {
  addLike, deleteLike, getLikes,
} = require('../controllers/likes');

likeRouter.post('/', addLike);
likeRouter.delete('/', deleteLike);
likeRouter.get('/', getLikes)

module.exports = likeRouter;