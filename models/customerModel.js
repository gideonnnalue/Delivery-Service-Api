const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please specify the customers name']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please specify the customers email'],
      lowercase: true
    },
    profilePhoto: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    country: {
      type: String,
      required: [true, 'Please specify your country']
    },
    state: {
      type: String,
      required: [true, 'Please specify your state']
    },
    city: {
      type: String,
      required: [true, 'Please specify your city']
    },
    address: {
      type: String,
      required: [true, 'Please specify customers address'],
      minLength: [10, 'Address must have a minimum length of 10 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual populate
customerSchema.virtual('shipment', {
  ref: 'Shipment',
  foreignField: 'customer',
  localField: '_id'
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
