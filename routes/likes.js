const likesRouter = require('express').Router();
const {
  addLike, deleteLike, getLikes,
} = require('../controllers/likes');

likesRouter.post('/addlike/:id', addLike);
likesRouter.delete('/deletelike/:id', deleteLike);
likesRouter.get('/getlikes', getLikes);

module.exports = likesRouter;