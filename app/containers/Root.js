
import React from 'react';
import { Provider } from 'react-redux';

import MyRouter from './MyRouter.js';

import configureStore from '../store/configureStore.js';

// optional set the state of the store to match the server portion, example:
// let store = createStore(todoApp, window.STATE_FROM_SERVER)
// let store = createStore(todoApp);
const store = configureStore();

const Root = React.createClass({

  render() {
    return (
    <Provider store={store}>
      <MyRouter />
    </Provider>
    );
  }

});

export default Root;
