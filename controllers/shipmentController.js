const Shipment = require('../models/shipmentModel');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllShipment = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Shipment.find({}), req.query)
    .filter()
    .sort()
    .limitField()
    .pagination();

  const shipments = await features.query;

  res.status(200).json({
    status: 'success',
    result: shipments.length,
    data: {
      shipments
    }
  });
});

exports.createShipment = catchAsync(async (req, res, next) => {
  const shipment = await Shipment.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      shipment
    }
  });
});

exports.getShipment = catchAsync(async (req, res, next) => {
  const shipment = await Shipment.findById(req.params.id);

  if (!shipment) {
    return next(new AppError('No Shipment found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      shipment
    }
  });
});

exports.deleteShipment = catchAsync(async (req, res, next) => {
  const shipment = await Shipment.findByIdAndDelete(req.params.id);

  if (!shipment) {
    return next(new AppError('No customer found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updateShipment = catchAsync(async (req, res, next) => {
  const shipment = await Shipment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(201).json({
    status: 'success',
    data: {
      shipment
    }
  });
});
