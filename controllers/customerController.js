const Customer = require('../models/customerModel');

/**
 * Function used to get all customers
 * @function
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - response object
 * @return  {Object} result
 */
exports.getAllCustomers = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'customers fetched successfully'
    }
  });
};

/**
 * Function used to get a single customer
 * @function
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - response object
 * @return  {Object} result
 */
exports.getCustomer = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'customer fetched successfully'
    }
  });
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
exports.deleteCustomer = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'customer deleted successfully'
    }
  });
};

/**
 * Function used to update a customer's data
 * @function
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - response object
 * @return  {Object} result
 */
exports.updateCustomer = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'customer updated successfully'
    }
  });
};
