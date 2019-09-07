import React from 'react';
import logo from '../assets/logo.svg';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  logo: {
    width: 80,
  }
});

const Icon = ({classes}) => (
  <img className={classes.logo} src={logo} alt="logo" />
);

export default withStyles(styles)(Icon);
