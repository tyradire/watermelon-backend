const vendorRouter = require('express').Router();
const {
  createVendor, getVendors, deleteVendor,
} = require('../controllers/vendors');

vendorRouter.post('/addvendor', createVendor);
vendorRouter.get('/getvendors', getVendors);
vendorRouter.delete('/deletevendor', deleteVendor);

module.exports = vendorRouter;