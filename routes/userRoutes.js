const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signupUser);
router.post('/login', authController.loginUser);

router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);

module.exports = router;
