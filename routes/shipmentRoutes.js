const express = require('express');
const authController = require('../controllers/authController');
const shipmentController = require('../controllers/shipmentController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(shipmentController.getAllShipment)
  .post(shipmentController.createShipment);

router
  .route('/:id')
  .get(shipmentController.getShipment)
  .patch(shipmentController.updateShipment)
  .delete(shipmentController.deleteShipment);

module.exports = router;
