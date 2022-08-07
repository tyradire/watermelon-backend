const appRouter = require('express').Router();
const {
  verify,
} = require('../middlewares/auth');
const vendorRouter = require('./vendors');
const productRouter = require('./products');
const userRouter = require('./users');
const basketRouter = require('./baskets');
const likesRouter = require('./likes');

appRouter.use(verify);
appRouter.use(userRouter);
appRouter.use(vendorRouter);
appRouter.use(productRouter);
appRouter.use(basketRouter);
appRouter.use(likesRouter);

module.exports = appRouter;