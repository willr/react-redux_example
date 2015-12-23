import { combineReducers } from 'redux';
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions/actions.js';
const { SHOW_ALL } = VisibilityFilters;

/*
const initialState = {
  visibilityFilter : VisibilityFilters.SHOW_ALL,
  todo: []
};
*/

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
      // return a new object with current state and a todo array, 
      // the spread operator, will easily add the elements without us having to enumerate each item with add..
      // end withe new todo we are adding now..
      return [
        ...state, 
        { text: action.text, completed: false }
      ];
    case COMPLETE_TODO:
      // return a new object with current state, the todo array we will create new... initially with upto to 
      // the todo we will recreate, the new todo, the all items after the new todo
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

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;


