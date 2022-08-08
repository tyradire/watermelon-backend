const vendorRouter = require('express').Router();
const {
  createVendor, deleteVendor,
} = require('../controllers/vendors');

vendorRouter.post('/addvendor', createVendor);
vendorRouter.delete('/deletevendor', deleteVendor);

module.exports = vendorRouter;