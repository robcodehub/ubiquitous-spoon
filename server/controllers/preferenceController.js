const pool = require('../models/usersModel');

const preferenceController = {};

// Get intolerances and diet preferences
preferenceController.getDietAndIntolerances = async (req, res, next) => {
  const queryString = `SELECT * FROM userpreference WHERE user_id = ${req.user_id}`;

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

// Update diet and intolerances preferences
preferenceController.updateDietAndIntolerances = (req, res, next) => {
  // Get info from request
  const { userId } = req.body;
  const { glutenFree } = req.body;
  const { vegan } = req.body;
  const { vegetarian } = req.body;

  // Update info in database
  const text = `UPDATE userpreference SET gluten_free = '${glutenFree}', vegan = '${vegan}', vegetarian = '${vegetarian}' WHERE user_id = '${userId}'`;
  pool.query(text, (err, response) => {
    if (err) {
      return next(err);
    }
    next();
  });
};

// Get intolerances
preferenceController.getIntolerances = async (req, res, next) => {
  const queryString = `SELECT * FROM userpreference WHERE user_id = ${req.body.userId}`;

  // `SELECT r.id, title, summary, source_url, image FROM favorites f
  //   JOIN recipes r ON f.recipe_id = r.id WHERE user_id='${userId}'`

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

// Get diet preferences
preferenceController.getdietPreferences = async (req, res, next) => {
  const queryString = `SELECT * FROM userpreference WHERE user_id = ${req.body.userId}`;

  try {
    const { rows } = await pool.query(queryString);
    res.locals.preferences = rows;
    next();
  } catch (err) {
    next({
      log: `preferences controller error: ${err.message}`,
      message: { err: 'An error with getting preferences has occurred' },
    });
  }
};

// Update intolerances
preferenceController.updateIntolerances = (req, res, next) => {
  // Get info from request
  const { userId } = req.body;
  const { glutenFree } = req.body;
  const { vegan } = req.body;
  const { vegetarian } = req.body;

  // Update info in database
  const text = `UPDATE userpreference SET gluten_free = '${glutenFree}', vegan = '${vegan}', vegetarian = '${vegetarian}' WHERE user_id = '${userId}'`;
  pool.query(text, (err, response) => {
    if (err) {
      return next(err);
    }
    next();
  });
};

// Update diet preferences
preferenceController.updateDietPreferences = (req, res, next) => {
  // Get info from request
  const { userId } = req.body;
  const { glutenFree } = req.body;
  const { vegan } = req.body;
  const { vegetarian } = req.body;

  // Update info in database
  const text = `UPDATE userpreference SET gluten_free = '${glutenFree}', vegan = '${vegan}', vegetarian = '${vegetarian}' WHERE user_id = '${userId}'`;
  pool.query(text, (err, response) => {
    if (err) {
      return next(err);
    }
    next();
  });
};

module.exports = preferenceController;
