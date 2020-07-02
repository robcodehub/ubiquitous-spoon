const pool = require('../models/usersModel');

const preferenceController = {};

// Get all diets in database
preferenceController.getAllDiets = async (req, res, next) => {
  const queryString = `SELECT * FROM preferencelookup WHERE type_id=1;`;

  try {
    const { rows } = await pool.query(queryString);
    res.locals.diets = rows;
    next();
  } catch (err) {
    next({
      log: `preferences controller error: ${err.message}`,
      message: { err: 'An error with getting diets has occurred' },
    });
  }
};

// Get all intolerances in database
preferenceController.getIntolerances = async (req, res, next) => {
  const queryString = `SELECT * FROM preferencelookup WHERE type_id=2;`;

  try {
    const { rows } = await pool.query(queryString);
    res.locals.intolerances = rows;
    next();
  } catch (err) {
    next({
      log: `preferences controller error: ${err.message}`,
      message: { err: 'An error with getting intolerances has occurred' },
    });
  }
};

// Get intolerances and diet preferences
preferenceController.getDietAndIntolerances = async (req, res, next) => {
  const queryString = `SELECT * FROM preferencelookup;`;

  try {
    const { rows } = await pool.query(queryString);
    res.locals.preferences = rows;
    next();
  } catch (err) {
    next({
      log: `preferences controller error: ${err.message}`,
      message: { err: 'An error with getting diet and intolerances has occurred' },
    });
  }
};

// Get intolerances and diet preferences for a user
preferenceController.getUserPreferences = async (req, res, next) => {
  const queryString = `SELECT * FROM userpreference WHERE user_id=${req.body.user_id};`;
  try {
    const { rows } = await pool.query(queryString);
    res.locals.userpreferences = rows;
    next();
  } catch (err) {
    next({
      log: `preferences controller error: ${err.message}`,
      message: { err: 'An error with getting preferences for user has occurred' },
    });
  }
};

// Add user preferences to the database
preferenceController.addUserPreferences = async (req, res, next) => {
  let prefString = '';
  const user_id = req.body.user_id;

  req.body.diet.map((diet) => (prefString += `(${user_id}, ${diet}),`));

  req.body.intolerances.map((intolerance) => (prefString += `(${user_id}, ${intolerance}),`));

  prefString = prefString.slice(0, -1);

  const text = `INSERT INTO userpreference (user_id, preference_id)
  VALUES '${prefString};`;
  await pool.query(text, (err, response) => {
    if (err) {
      return next({
        log: 'addUserPreferences',
        message: { err: 'HERE: Error in addUserPreferences' },
      });
    }
    res.locals.userpreferences = req.body.userpreferences;
    next();
  });
};

// // Update diet and intolerances preferences
// preferenceController.updateDietAndIntolerances = (req, res, next) => {
//   // Get info from request
//   const { userId } = req.body;
//   const { glutenFree } = req.body;
//   const { vegan } = req.body;
//   const { vegetarian } = req.body;

//   // Update info in database
//   const text = `UPDATE userpreference SET gluten_free = '${glutenFree}', vegan = '${vegan}', vegetarian = '${vegetarian}' WHERE user_id = '${userId}'`;
//   pool.query(text, (err, response) => {
//     if (err) {
//       return next(err);
//     }
//     next();
//   });
// };

// // Update intolerances
// preferenceController.updateIntolerances = (req, res, next) => {
//   // Get info from request
//   const { userId } = req.body;
//   const { glutenFree } = req.body;
//   const { vegan } = req.body;
//   const { vegetarian } = req.body;

//   // Update info in database
//   const text = `UPDATE userpreference SET gluten_free = '${glutenFree}', vegan = '${vegan}', vegetarian = '${vegetarian}' WHERE user_id = '${userId}'`;
//   pool.query(text, (err, response) => {
//     if (err) {
//       return next(err);
//     }
//     next();
//   });
// };

// // Update diet preferences
// preferenceController.updateDietPreferences = (req, res, next) => {
//   // Get info from request
//   const { userId } = req.body;
//   const { glutenFree } = req.body;
//   const { vegan } = req.body;
//   const { vegetarian } = req.body;

//   // Update info in database
//   const text = `UPDATE userpreference SET gluten_free = '${glutenFree}', vegan = '${vegan}', vegetarian = '${vegetarian}' WHERE user_id = '${userId}'`;
//   pool.query(text, (err, response) => {
//     if (err) {
//       return next(err);
//     }
//     next();
//   });
// };

module.exports = preferenceController;
