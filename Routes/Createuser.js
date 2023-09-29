const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwtecret="mynameismynameis$mynameis"
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken')
router.post("/createuser", [
  body('Email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('Password', 'Incorrect Password').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const salt= await bcrypt.genSalt(10);
const secpassword= await bcrypt.hash(req.body.Password,salt)
  try {
    await User.create({
      name: req.body.name,
      Password: secpassword,
      Email: req.body.Email,
      location: req.body.location
    })
    .then(res.json({ success: true }));
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});



// login user


router.post("/loginuser", [
  body('Email').isEmail(),
  body('Password', 'Incorrect Password').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  let email = req.body.Email;
  let password = req.body.Password;

  try {
    let user = await User.findOne({ Email: email });

    if (!user) {
      return res.status(400).json({ error: "Try logging with correct credentials1" });
    }

    const pwd= await bcrypt.compare(req.body.Password,user.Password)
    const p=user.Password
    if (!pwd) {
        
      return res.status(400).json({ error: "Try logging with correct credentials2" });
    }
const data={
  user:{
    id:user.id
  }
}
const authToken=jwt.sign(data,jwtecret)
    return res.json({ success: true,authToken:authToken });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

  
module.exports = router;
