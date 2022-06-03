const userRouter = require('express').Router();
const {
  createUser, login, getUser,
} = require('../controllers/users');

userRouter.post('/', createUser);
userRouter.post('/', login);
userRouter.get('/', getUser);

module.exports = userRouter;