import React from 'react';
import ReactDOM from 'react-dom';

import { Home, Campaigns, Entities } from './pages';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';

import theme from './styles/theme';

import './styles/index.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <Route path="/" component={Home} />
      <Route path="/campaigns" component={Campaigns} />
      <Route path="/entities/:id" component={Entities} />
    </Router>
  </ThemeProvider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
