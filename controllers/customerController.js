const Customer = require('../models/customerModel');
const APIFeatures = require('../utils/APIFeatures');

/**
 * Function used to get all customers
 * @function
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - response object
 * @return  {Object} result
 */
exports.getAllCustomers = async (req, res, next) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err
    });
  }
};

/**
 * Function used to get a single customer
 * @function
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - response object
 * @return  {Object} result
 */
exports.getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        customer
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err
    });
  }
};

/**
 * Function used to create a customer
 * @function
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - response object
 * @return  {Object} undefined
 */
exports.createCustomer = async (req, res, next) => {
  try {
    const newCustomer = await Customer.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        data: newCustomer
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err
    });
  }
};

/**
 * Function used to delete a customer
 * @function
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - response object
 * @return  {Object} result
 */
exports.deleteCustomer = async (req, res, next) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err
    });
  }
};

/**
 * Function used to update a customer's data
 * @function
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - response object
 * @return  {Object} result
 */
exports.updateCustomer = async (req, res, next) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err
    });
  }
};
