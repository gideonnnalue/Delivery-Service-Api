const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: [true, "A Shipment must have a sender's name"],
    trim: true
  },
  senderAddress: {
    type: String,
    required: [true, "A Shipment must have a sender's address"],
    trim: true
  },
  senderPhoneNumber: {
    type: String
  },
  parcelName: {
    type: String,
    required: [true, 'A Shipment must have a parcel name'],
    trim: true
  },
  parcelInfo: {
    type: String,
    required: [true, 'A Shipment must have information of the parcel'],
    trim: true
  },
  dropLocation: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number],
    address: String,
    description: String
  },
  currentLocation: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number],
    address: String,
    description: String
  },
  pickUpLocation: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number],
    address: String,
    description: String
  },
  deliveryStatus: {
    type: String,
    enum: ['pending', 'on transit', 'offloading', 'delivered'],
    default: 'pending',
    lowercase: true
  },
  images: [String],
  dropDate: {
    type: Date,
    default: Date.now()
  },
  pickupDate: {
    type: Date,
    default: Date.now() + 1000 * 60 * 60 * 24 * 3
  },
  trackingNumber: {
    type: String,
    required: [true, 'A Shipment must have a tracking number'],
    trim: true,
    unique: true,
    toUpperCase: true
  },
  packageNumber: {
    type: String,
    required: [true, 'A Shipment must have a package number'],
    trim: true,
    unique: true,
    toUpperCase: true
  },
  packageWeight: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Shipment = mongoose.model('Shipment', shipmentSchema);
module.exports = Shipment;
