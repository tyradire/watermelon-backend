const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createUser, login, getUser,
} = require('../controllers/users');

userRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
    role: Joi.string().required(),
  }),
}), createUser);
userRouter.post('/signin', login);
userRouter.get('/users/me', getUser);

module.exports = userRouter;