const { Vendor, Product } = require('../models/models');
const ConflictError = require('../errors/ConflictError');
const CastError = require('../errors/CastError');
const NotFoundError = require('../errors/NotFoundError');

const createVendor = (req, res, next) => {
  const { name } = req.body;
  Vendor.findOne({where: {name} })
    .then((vendor) => {
      if (vendor) throw new ConflictError('Производитель уже зарегистрирован');
      return;
    })
    .then((res) => Vendor.create({name}))
    .then((vendor) => res.status(200).send(vendor))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new CastError('Переданы некорректные данные при создании пользователя'));
      next(err);
    })
}

const getVendors = (req, res, next) => Vendor.findAll()
  .then((vendors) => {
    if (!vendors) throw new NotFoundError('Ни одного производителя не найдено');
    res.status(200).send(vendors);
  })
  .catch(next);

const deleteVendor = (req, res, next) => {
  const { name } = req.body;
  Vendor.findOne({where: {name} })
  .then((vendor) => {
    if (!vendor) throw new NotFoundError('Продавец не найден');
    else {
      return Product.destroy({
        where: {vendorId: vendor.id},
      });
    }
  })
  .then((products) => {
    return Vendor.destroy({
      where: {name},
    });
  })
  .then((item) => {
    res.status(200).send({message: 'Вендор удалён'})
  })
}

module.exports = {
  createVendor, getVendors, deleteVendor,
};