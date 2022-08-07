const likeRouter = require('express').Router();
const {
  addLike, deleteLike, getLikes,
} = require('../controllers/likes');

likeRouter.post('/addlike/:id', addLike);
likeRouter.delete('/deletelike/:id', deleteLike);
likeRouter.get('/getlikes', getLikes);

module.exports = likeRouter;