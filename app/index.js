import React from 'react';
import { render } from 'react-dom';

// const routes = require('./config/routes.js');
// const MyRouter = routes.MyRouter;
import MyRouter from './config/routes.js';

// console.debug(typeof ORouter + string(ORouter));
// const Factory = React.createFactory(MyRouter);
// const rootFactory = Factory({});
// render(rootFactory, document.getElementById('root'));

/* <MyRouter />, document.getElementById('root') */

render(
  <MyRouter />, document.getElementById('root')  
);


