import React from 'react';

import {
  AppBar,
  Typography,
  Toolbar,
  Icon,
  Select,
  MenuItem,
  Divider,
  Grid,
  Button,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

import Logo from '../components/IconWithNavigation';
import {GetGeoDistance} from '../helpers/distance';
import { withStyles } from '@material-ui/core/styles';
import { getCampaigns } from '../connection';

const styles = theme => ({
  headerContainer: {
    padding: 0,
    paddingRight: theme.spacing(3),
    color: 'white',
  },
  headerTitle: {
    flexGrow: 1,
  },
  filterContainer: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  filter: {
    width: '100%',
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
  campaigns: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
  },
  campaignContainer: {
    padding: theme.spacing(1),
    paddingRight: theme.spacing(2),
  },
  campaignTitle: {
    color: 'black',
  },
  campaignLink: {
    textDecoration: 'none',
    textAlign: 'left',
  },
  gravity1: { color: 'yellow' },
  gravity2: { color: 'orange' },
  gravity3: { color: 'red' },
});

class Campaigns extends React.Component {

  state = {
    selectedFilter: 0,
    campaigns: [],
  }

  componentDidMount() {
    getCampaigns()
    .then(campaigns => this.setState({campaigns}));
  }

  changeFilter(event) {
    this.setState({selectedFilter: event.target.value});
    var campaigns = this.state.campaigns;
    if(event.target.value == 2) {
      campaigns = campaigns.sort((a, b) => (a.gravity < b.gravity) ? 1 : -1);
      this.setState({campaigns});
    } else if(event.target.value == 1) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) =>{
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          var teste = campaigns.sort((a, b) => (GetGeoDistance(a.Location[0], a.Location[1], latitude, longitude) > GetGeoDistance(b.Location[0], b.Location[1], latitude, longitude)) ? 1 : -1);
          this.setState({campaigns: teste});
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
  }

  Header = ({classes}) => (
    <AppBar position="static" color="primary">
      <Toolbar className={classes.headerContainer}>
        <Logo />
        <Typography className={classes.headerTitle} variant="h5">Buscar Campanhas</Typography>
        <Icon>search</Icon>
      </Toolbar>
    </AppBar>
  );

  Campaign = ({classes, campaign}) => (
    <>
    <Link className={classes.campaignLink} to={`/campaign/${campaign.id}`}>
      <Grid container justify="space-between" alignItems="center" className={classes.campaignContainer}>
        <Grid item>
          <Typography className={classes.campaignTitle} variant="h6">{campaign.name}</Typography>
          <Typography variant="subtitle2">{campaign.Location[2]} - {campaign.date || '21/07/2019'}</Typography>
        </Grid>
        <Grid item>
          <Icon className={classes[`gravity${campaign.gravity}`]} fontSize='large'>
            warning
          </Icon>
        </Grid>
      </Grid>
    </Link>
    <Divider />
    </>
  );

  filters = ['Relevância', 'Proximidade', 'Gravidade', 'Demanda'];

  render() {
    const { classes } = this.props;
    return (
      <>
        <this.Header classes={classes} />
        <div className={classes.filterContainer}>
          <Typography variant="subtitle2">Mostrar por</Typography>
          <Select
            className={classes.filter}
            inputProps={{
              name: 'filter'
            }}
            value={this.state.selectedFilter}
            onChange={(event) => this.changeFilter(event)}
          >
            {this.filters.map((filter, index) => (
              <MenuItem key={index} value={index}>{filter}</MenuItem>
            ))}
          </Select>
        </div>
        <div className={classes.campaigns}>
          {this.state.campaigns.map((campaign) => (
            <this.Campaign key={campaign.id} campaign={campaign} classes={classes} />
          ))}
        </div>
      </>
    );
  }
}

export default withStyles(styles)(Campaigns);
