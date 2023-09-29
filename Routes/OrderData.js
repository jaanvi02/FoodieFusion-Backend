const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

// Create or update order data
router.post('/orderData', async (req, res) => {
  try {
    const { Email, order_data, order_date } = req.body;

    // Check if the user's email is valid and not null
    if (!Email || Email.trim() === '') {
      // Handle the case of missing or null email gracefully
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    // Check if the user's email exists in the database
    const existingOrder = await Order.findOne({ 'Email': Email });

    if (!existingOrder) {
      // If the user's email doesn't exist, create a new order record
      await Order.create({
        Email: Email,
        order_data: [{ Order_date: order_date, data: order_data }]
      });
    } else {
      // If the user's email exists, update the existing order with new data
      existingOrder.order_data.push({ Order_date: order_date, data: order_data });
      await existingOrder.save();
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error creating/updating order:", error);
    res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
});

// Retrieve order data for a user
router.post('/myOrderData', async (req, res) => {
  try {
    const { Email } = req.body;

    const userOrderData = await Order.findOne({ 'Email': Email });

    if (!userOrderData) {
      // If user data doesn't exist, return a message or appropriate response
      res.json({ success: false, message: "No order data found for this user." });
    } else {
      res.json({ success: true, orderData: userOrderData });
    }
  } catch (error) {
    console.error("Error retrieving order data:", error);
    res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
});

module.exports = router;
