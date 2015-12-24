import React from 'react';
import { connect } from 'react-redux';

import auth from '../utils/auth';

const Dashboard = React.createClass({
  render() {
    const token = auth.getToken(this.props.loginInfo);

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
        {this.props.children}
      </div>
    );
  }
});

function select(state) {
  return {
    loginInfo: state.loginInfo
  };
}

export default connect(select)(Dashboard);

