/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import { SET_USERNAME, SET_PASSWORD, SET_ADMINKEY, GET_ADMINKEY, SET_LOGGEDIN, SENDING_REQUEST } from '../constants/AppConstants';
// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign;

// The initial application state
const initialState = {
  userName: "",
  password: "",
  adminKey: "",
  isLogged: false
};

// Takes care of changing the application state
export function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERNAME:
      return assign({}, state, {
        userName: action.newState
      });
      break;

    case SET_PASSWORD:
      return assign({}, state, {
        password: action.newState
      });
      break;

    case SET_ADMINKEY:
      return assign({}, state, {
        adminKey: action.newState
      });
      break;

    case GET_ADMINKEY:
      return state.adminKey;
      break;

    case SET_LOGGEDIN:
      return assign({}, state, {
        isLogged: action.newState
      });
      break;

    case SENDING_REQUEST:
      return assign({}, state, {
        currentlySending: action.sending
      });
      break;
    default:
      return state;
  }
}
