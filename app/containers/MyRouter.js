import React from 'react';
import { Router, Route } from 'react-router';
import { IndexRoute } from 'react-router';
import { connect } from 'react-redux';

import auth from '../utils/auth.js';

import About from '../components/About.js';
import App from '../components/App.js';
import Dashboard from '../components/Dashboard.js';
import Landing from '../components/Landing.js';
import Login from '../components/Login.js';
import Logout from '../components/Logout.js';
import PageOne from '../components/PageOne.js';
import PageTwo from '../components/PageTwo.js';
import User from '../components/User.js';
import TodoApp from '../components/TodoApp.js';

import { VisibilityFilters } from '../actions/actions.js';

/*
function redirectToLogin(nextState, replaceState) {
  if (!auth.loggedIn()) {
    replaceState({
      nextPathname: nextState.location.pathname
    }, '/login');
  }
}

function redirectToDashboard(nextState, replaceState) {
  if (auth.loggedIn()) {
    replaceState(null, '/');
  }
}

function dashboardLandingComponent(location, cb) {

  // share the path
  // return the correct component
  if (auth.loggedIn()) {
    return cb(null, Dashboard);
  } else {
    return cb(null, Landing);
  }
}

function authPageOneComponent(location, cb) {
  if (auth.loggedIn()) {
    return cb(null, PageOne);
  } 
  return cb();
}
*/

const MyRouter = React.createClass({
  redirectToLogin(nextState, replaceState) {
    if (!auth.loggedIn(this.props.loginInfo)) {
      replaceState({
        nextPathname: nextState.location.pathname
      }, '/login');
    }
  },
  redirectToDashboard(nextState, replaceState) {
    if (auth.loggedIn(this.props.loginInfo)) {
      replaceState(null, '/');
    }
  },
  dashboardLandingComponent(location, cb) {
    // share the path
    // return the correct component
    if (auth.loggedIn(this.props.loginInfo)) {
      return cb(null, Dashboard);
    } else {
      return cb(null, Landing);
    }
  },
  authPageOneComponent(location, cb) {
    if (auth.loggedIn(this.props.loginInfo)) {
      return cb(null, PageOne);
    } 
    return cb();
  },
 
  render() {
    return (
      <Router>
        <Route component={App} >
          <Route path='/logout' component={Logout} />
          <Route path='/about' component={About} />
          <Route onEnter={this.redirectToDashboard} >
            <Route path='/login' component={Login} />
          </Route>
          <Route onEnter={this.redirectToLogin} >
            <Route path='/user/:id' component={User} />
          </Route>
          <Route path='/' getComponent={this.dashboardLandingComponent} >
            <IndexRoute getComponent={this.authPageOneComponent} />
            <Route onEnter={this.redirectToLogin} >
              <Route path='/page2' component={PageTwo} />
              <Route path='/todo' component={TodoApp} />
            </Route>
          </Route>
        </Route>
      </Router>
    );
  }
});

// export default MyRouter;

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
    visibilityFilter: state.visibilityFilter,
    loginInfo: state.loginInfo
  };
}

export default connect(select)(MyRouter);

