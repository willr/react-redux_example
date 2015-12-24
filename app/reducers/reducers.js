import { combineReducers } from 'redux';
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER,
          LOGIN_SUCCESS, LOGOUT, VisibilityFilters } from '../actions/actions.js';
const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      // return a new object with current state and a todos array,
      // the spread operator, will easily add the elements without us having to enumerate each item with add..
      // end withe new todos we are adding now..
      return [
        ...state, 
        { text: action.text, completed: false }
      ];
    case COMPLETE_TODO:
      // return a new object with current state, the todos array we will create new... initially with upto to
      // the todos we will recreate, the new todos, the all items after the new todos
      // spread operator with arrays makes this very succinct..
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], { completed: true }),
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
}

function loginInfo(state, action) {
  if (state === undefined) {
    state = {
      loginError: false,
      loginToken: ''
    };
  }

  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loginError: false,
        loginToken: action.token
      };
    case LOGOUT:
      return {
        loginError: false,
        loginToken: ''
      };
    default:
      return state;
  }

}

const rootReducer = combineReducers({
  visibilityFilter,
  todos,
  loginInfo
});

export default rootReducer;


