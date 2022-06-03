const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

const  createUser = (req, res, next) => {
  const {
    email, password
  } = req.body;
  User.findOne({ 
    where: {
      email
    } 
  })
  .then((user) => {
    if (user) throw new ConflictError('Пользователь с таким email уже существует');
    return bcrypt.hash(password, 10);
  })
  .then((hash) => User.create({
    password: hash, email,
  }))
  .then((user) => {
    Basket.create({
      userId: user.id,
    });
    return user;
  })
  .then((user) => {
    res.status(200).send({
    email: user.email, role: user.role, id: user.id,
  })}) 
  .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new UnauthorizedError('Невалидные данные');
  User.findOne({
    where: {
      email
    }
  })
  .then(async (user) => {
    if (!user) throw new UnauthorizedError('Неправильные почта или пароль');
    return { user, matched: await bcrypt.compare(password, user.password) };
  })
  .then(({ user, matched }) => {
    if (!matched) throw new UnauthorizedError('Неправильные почта или пароль');
    const token = jwt.sign(
      { id: user.id,
        role: user.role
      },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
    res.status(200).send({ token, role: user.role });
  })
  .catch(next);
};

const getUser = (req, res, next) => {
  const id = req.user.id;
  User.findOne({
    where: { id }
  })
  .then((user) => {
    if (!user) throw new NotFoundError('Пользователь с указанным id не найден')
    console.log(user)
    res.status(200).send(user)
  })
  .catch(next);
}

module.exports = {
  createUser, login, getUser,
};