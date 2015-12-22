import React from 'react';
// import { render } from 'react-dom';
import { Router, Route } from 'react-router';
// import { createHistory, useBasename } from 'history';
import { IndexRoute } from 'react-router';

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
    cb(null, Dashboard.default);
  } else {
    cb(null, Landing.default);
  }
}

function authPageOneComponent(location, cb) {
  if (auth.loggedIn()) {
    cb(null, PageOne.default);
  } 
  cb();
}

const MyRouter = React.createClass({

  render() {
    return (
      <Router>
        <Route component={App}  >
          <Route path='/logout' component={Logout} />
          <Route path='/about' component={About} />
          <Route onEnter={redirectToDashboard} >
            <Route path='/login' component={Login} />
          </Route>
          <Route onEnter={redirectToLogin} >
            <Route path='/user/:id' component={User} />
          </Route>
          <Route path='/' getComponent={dashboardLandingComponent}  >
            <IndexRoute getComponent={authPageOneComponent}/>
            <Route onEnter={redirectToLogin} >
              <Route path='/page2' component={PageTwo} />
            </Route>
          </Route>
        </Route>
      </Router>
    );
  }
});

export default MyRouter;


