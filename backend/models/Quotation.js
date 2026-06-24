const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  amount: {
    type: Number,
    default: 0
  },
  submissionDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'submitted', 'approved', 'rejected'],
    default: 'pending'
  },
  deliveryTime: {
    type: String,
    default: ''
  },
  warranty: {
    type: String,
    default: ''
  },
  advancePayment: {
    type: String,
    default: ''
  },
  installation: {
    type: String,
    default: ''
  },
  lineItems: [
    {
      name: String,
      qty: Number,
      unit: String,
      price: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Quotation', quotationSchema);