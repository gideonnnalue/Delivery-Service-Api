const express = require('express');
const authController = require('../controllers/authController');
const customerController = require('../controllers/customerController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(customerController.getAllCustomers)
  .post(customerController.createCustomer);

router
  .route('/:id')
  .get(customerController.getCustomer)
  .patch(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

module.exports = router;
