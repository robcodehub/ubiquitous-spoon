const express = require('express');

const router = express.Router();
const usersController = require('../controllers/usersController');
const jwtController = require('../controllers/jwtController');
const preferenceController = require('../controllers/preferenceController');

router.post(
  '/',
  usersController.checkUsername,
  usersController.checkPassword,
  usersController.addUser,
  preferenceController.addUserPreferences,
  jwtController.createJWT,
  (req, res) => {
    res.status(200).json({
      success: true,
      username: res.locals.username,
      token: res.locals.token,
      token_expiry: res.locals.token_expiry,
    });
  }
);

module.exports = router;
