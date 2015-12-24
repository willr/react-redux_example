
import React from 'react';
import { connect } from 'react-redux';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions/actions.js';
// import { addTodo, completeTodo, setVisibilityFilter } from '../actions/actions.js';

import AddTodo from './AddTodo.js';
import TodoList from './TodoList.js';
import Footer from './Footer.js';

const TodoApp = React.createClass({
  
  render() {
    // injected by connect() call
    const { dispatch, visibleTodos, visibilityFilter } = this.props;
    return (
      <div>
        <AddTodo
          onAddClick = { text => 
            dispatch(addTodo(text))
          } />
        <TodoList
          todos = {visibleTodos} 
          onTodoClick = { id => 
            dispatch(completeTodo(id))
          } />
        <Footer
          filter={visibilityFilter}
          onFilterChange = { nextFilter =>
            dispatch(setVisibilityFilter(nextFilter)) 
          } />
      </div>
    );
  }
});

function selectTodos(todos, filter) {
  switch(filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
  }
}

function select(state) {

  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  };
}

export default connect(select)(TodoApp);
// export default TodoApp;
