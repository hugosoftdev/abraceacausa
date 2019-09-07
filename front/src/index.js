import React from 'react';
import ReactDOM from 'react-dom';

import { Home, Campaigns } from './pages';

import { BrowserRouter as Router, Route } from "react-router-dom";

import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <Route path="/" exact component={Home} />
    <Route path="/campaigns" component={Campaigns} />
  </Router>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
