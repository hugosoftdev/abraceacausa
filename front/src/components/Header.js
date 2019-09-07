import React from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
  Icon,
} from '@material-ui/core';

import Logo from '../components/IconWithNavigation';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  headerContainer: {
    padding: 0,
    paddingRight: theme.spacing(3),
    color: 'white',
  },
  headerTitle: {
    flexGrow: 1,
  },
})

const Header = ({ classes, title }) => (
  <AppBar position="static" color="primary">
    <Toolbar className={classes.headerContainer}>
      <Logo />
      <Typography className={classes.headerTitle} variant="h5">{title}</Typography>
      <Icon>search</Icon>
    </Toolbar>
  </AppBar>
);
export default withStyles(styles)(Header);
