const vendorRouter = require('express').Router();
const {
  createVendor, getVendors,
} = require('../controllers/vendors');

vendorRouter.post('/', createVendor);
vendorRouter.get('/', getVendors);

module.exports = vendorRouter;