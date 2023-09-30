const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable if available

const bodyParser = require('body-parser');
const mongoDB = require('./db');

mongoDB(); // Initialize your MongoDB connection

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://incredible-meerkat-a6015d.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Parse JSON requests
app.use(express.json());

// Routes
app.use('/api', require('./Routes/Createuser'));
app.use('/api', require('./Routes/Displaydata'));
app.use('/api', require('./Routes/OrderData'));

// Body-parser Middleware (you don't need both bodyParser.json() and express.json())
app.use(bodyParser.json());

// Example POST route
app.post('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
