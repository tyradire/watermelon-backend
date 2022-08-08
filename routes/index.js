const appRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createUser, login,
} = require('../controllers/users');
const {
  verify,
} = require('../middlewares/auth');

const vendorRouter = require('./vendors');
const productRouter = require('./products');
const userRouter = require('./users');
const basketRouter = require('./baskets');
const likesRouter = require('./likes');

appRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
    role: Joi.string().required(),
  }),
}), createUser);
appRouter.post('/signin', login);

appRouter.use(productRouter);
appRouter.use(verify);
appRouter.use(userRouter);
appRouter.use(vendorRouter);
appRouter.use(basketRouter);
appRouter.use(likesRouter);

module.exports = appRouter;