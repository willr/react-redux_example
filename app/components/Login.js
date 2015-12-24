import React from 'react';
import { History } from 'react-router';
import { connect } from 'react-redux';

import { loginSucessful, loginError } from '../actions/actions.js';
import auth from '../utils/auth.js';

const Login = React.createClass({

  mixins: [ History ],

  getInitialState() {
    return {
      error: false
    };
  },

  handleSubmit(event) {
    event.preventDefault();

    const email = this.refs.email.value;
    const pass = this.refs.pass.value;
    const state = this.props.loginInfo;

    auth.login(email, pass, state, (res) => {
      
      const { location, dispatch } = this.props;
      if (!res.loggedIn) {
        dispatch(loginError()); 
        // return this.setState({ error: true });
        return;
      }
      if (res.modified) {
        dispatch(loginSucessful(res.token));
      }
      if (location.state && location.state.nextPathname) {
        this.history.replaceState(null, location.state.nextPathname);
      } else {
        this.history.replaceState(null, '/');
      }
    });
  },

  render() {
    const { loginError } = this.props.loginInfo.loginError;
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref='email' placeholder='email' defaultValue='joe@example.com' /></label>
        <label><input ref='pass' placeholder='password' /></label> (hint: password1)<br />
        <button type='submit'>login</button>
        {loginError && (
          <p>Bad login information</p>
        )}
      </form>
    );
  }

});

function select(state) {
  return {
    loginInfo: state.loginInfo
  };
}

export default connect(select)(Login);

