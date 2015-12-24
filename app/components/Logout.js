import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../actions/actions.js';
import auth from '../utils/auth';

const Logout = React.createClass({
  componentDidMount() {
    const { dispatch } = this.props;
    auth.logout((res) => {
       
      if (res.error) {
        // do nothing.. since we dont check the result
      }
      dispatch(logout());
    });
  },

  render() {
    return <p>You are now logged ut</p>;
  }
});

function select(state) {
  return {
    loginInfo: state.loginInfo
  };
}

export default connect(select)(Logout);

