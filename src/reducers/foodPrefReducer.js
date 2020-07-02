/**
 * ************************************
 *
 * @module  foodPrefReducer
 * @author
 * @date
 * @description reducer for food preferences
 *
 * ************************************
 */

import * as types from '../constants/actionTypes';

const initialState = {
  glutenFree: null,
  vegan: null,
  vegetarian: null,
  pescetarian: null,
  paleo: null,
  ketogenic: null,
  whole30: null,
};

const foodPrefReducer = (state = initialState, action) => {
  const [
    glutenFree,
    vegan,
    vegetarian,
    pescetarian,
    paleo,
    ketogenic,
    whole30,
  ] = action.payload.foodPrefs;

  const [
    dairy,
    egg,
    // 'Gluten',
    // 'Grain',
    peanut,
    seafood,
    sesame,
    shellfish,
    soy,
    sulfite,
    treeNut,
    // 'Wheat',
  ] = action.payload.intolerances;

  switch (action.type) {
    case types.SET_FOODPREFS:
      return {
        ...state,
        glutenFree,
        vegan,
        vegetarian,
        pescetarian,
        paleo,
        ketogenic,
        whole30,
      };

    default:
      return state;
  }
};

export default foodPrefReducer;
