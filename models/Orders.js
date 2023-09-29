const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  Email: {
    type: String,
    required: true,
    unique: true
  },
  order_data: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('Order', orderSchema);
