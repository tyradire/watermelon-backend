const vendorRouter = require('express').Router();
const {
  verify,
} = require('../middlewares/auth');
const {
  createVendor, getVendors, deleteVendor,
} = require('../controllers/vendors');

vendorRouter.use(verify);
vendorRouter.post('/addvendor', createVendor);
vendorRouter.get('/getvendors', getVendors);
vendorRouter.delete('/deletevendor', deleteVendor);

module.exports = vendorRouter;