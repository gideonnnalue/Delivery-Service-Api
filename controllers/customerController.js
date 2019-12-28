const Customer = require('../models/customerModel');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

/**
 * Function used to get all customers
 * @function
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - response object
 * @return  {Object} result
 */
exports.getAllCustomers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Customer.find({}), req.query)
    .filter()
    .sort()
    .limitField()
    .pagination();

  const customers = await features.query;

  res.status(200).json({
    status: 'success',
    result: customers.length,
    data: {
      customers
    }
  });
});

/**
 * Function used to get a single customer
 * @function
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - response object
 * @return  {Object} result
 */
exports.getCustomer = catchAsync(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new AppError('No Customer found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      customer
    }
  });
});

/**
 * Function used to create a customer
 * @function
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - response object
 * @return  {Object} undefined
 */
exports.createCustomer = catchAsync(async (req, res, next) => {
  const newCustomer = await Customer.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      data: newCustomer
    }
  });
});

/**
 * Function used to delete a customer
 * @function
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - response object
 * @return  {Object} result
 */
exports.deleteCustomer = catchAsync(async (req, res, next) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer) {
    return next(new AppError('No customer found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

/**
 * Function used to update a customer's data
 * @function
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - response object
 * @return  {Object} result
 */
exports.updateCustomer = catchAsync(async (req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(201).json({
    status: 'success',
    data: {
      customer
    }
  });
});
