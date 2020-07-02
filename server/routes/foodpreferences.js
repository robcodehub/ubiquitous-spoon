const express = require('express');

const router = express.Router();

const preferenceController = require('../controllers/preferenceController');

// Get all diets in database
router.get('/diets', preferenceController.getAllDiets, (req, res) => {
  res.status(200).json({ success: true, diets: res.locals.diets });
});

// Get all intolerances in database
router.get('/intolerances', preferenceController.getAllIntolerances, (req, res) => {
  res.status(200).json({ success: true, intolerances: res.locals.intolerances });
});

// Get all diets and intolerances in database
router.get('/dietintolerances', preferenceController.getDietAndIntolerances, (req, res) => {
  res.status(200).json({ success: true, preferences: res.locals.preferences });
});

// Get all diets and intolerances for user
router.get('/userpreferences', preferenceController.getUserPreferences, (req, res) => {
  res.status(200).json({ success: true, userpreferences: res.locals.userpreferences });
});

// Post diets and intolerances for new user
router.post('/userpreferences', preferenceController.addUserPreferences, (req, res) => {
  res.status(200).json({ success: true, userpreferences: res.locals.userpreferences });
});

module.exports = router;
