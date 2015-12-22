import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { createHistory } from 'history'

var routes = require('./config/routes.js');
const App = routes.App;
const MyRouter = routes.MyRouter;
// import { MyRouter, App } from './config/routes.js'


render(
  <MyRouter />, document.getElementById('root')
)

