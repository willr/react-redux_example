import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import { createHistory, useBasename } from 'history'
import { IndexRoute, Redirect } from 'react-router'

import PageOne from '../components/PageOne.js'

var About = require('../components/About.js').About

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/inbox'>Inbox</Link></li>
          <li><Link to='/pageone'> PageOne </Link></li>
        </ul>
        {this.props.children || 'Hello'}
      </div>
    )
  }
})

const Dashboard = React.createClass({
  render() {
    return <div>Welcome to the app!</div>
  }
});

const Inbox = React.createClass({
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || 'Welcome to your Inbox'}
      </div>
    )
  }
});

const Message = React.createClass({
  render() {
    return (
      <div>
        <h3>id: {this.props.params.id}</h3>
        From: George <br/>
        To: Me <br/>
        Subjct: Turtles...<br/>
      </div>
    )
  }
});

const InboxStats = React.createClass({
  render() {
    return (
      <div>
        <div>
          Inbox Stats: <br/>
          5 unread <br/>
          10 read
        </div>
        <div>
          <h2>Messages</h2>
          <Link to='/messages/123'>Message from George</Link> <br/>
          The redirect <Link to='/inbox/messages/123'> redirect there </Link>
        </div>
      </div>
    )
  }
});

const MyRouter = React.createClass({

  render() {
    return (
      <Router>
        {/* Show the dashboard at / */}
        <IndexRoute component={Dashboard} />
        <Route path='/' component={App} >
          <Route path='about' component={About} />
          <Route path='inbox' component={Inbox} >
            {/* add some nested routes where we want the UI to next */}
            {/* render the stats page when at the '/inbox' */}
            <IndexRoute component={InboxStats} />
            {/* render the message component at /inbox/messages/123 */}
            <Route path='/messages/:id' component={Message} />
            <Redirect from='messages/:id' to='/messages/:id' />
          </Route>
          <Route path='pageone' component={PageOne} />
        </Route> 
      </Router>
    )
  }
})

module.exports = {
  MyRouter: MyRouter,
  App: App
};


