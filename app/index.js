import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import MyRouter from './config/routes.js';

import { createStore } from 'redux';
import todoApp from './reducers/reducers.js';

// optional set the state of the store to match the server portion, example:
// let store = createStore(todoApp, window.STATE_FROM_SERVER)
let store = createStore(todoApp);

render(
  <Provider store={store}>
    <MyRouter />
  </Provider>, document.getElementById('root')  
);


