import React from 'react';
import Header from '../components/Header';

import {
  Typography,
  Icon,
  Divider,
  Grid,
  GridList,
  GridListTile,
} from '@material-ui/core';

import { getCampaignById } from '../connection';
import { withStyles } from '@material-ui/core/styles';

import water from '../assets/agua.jpg';
import food from '../assets/comida.jpg';
import health from '../assets/medico.jpg';

const styles = theme => ({
  container: {
    padding: theme.spacing(3),
  },
  gravity1: { color: 'yellow' },
  gravity2: { color: 'orange' },
  gravity3: { color: 'red' },
  entityContact: {
    padding: theme.spacing(2),
  },
  campaignNeed: {
    textAlign: 'center',
  },
  campaignNeedIcon: {
    width: '90%',
  },
  needs: {
    paddingTop: theme.spacing(2),
  },
  entityList: {
    paddingTop: theme.spacing(3),
  }
});

class Entities extends React.Component {
  state = {
    campaign: null,
    needs: {},
  }

  possibleNeeds = {
    "Alimentos não perecíveis": {
      available: 0,
      needed: 0,
      icon: food,
    },
    "Água potável": {
      available: 0,
      needed: 0,
      icon: water,
    },
    "Auxílio médico": {
      available: 0,
      needed: 0,
      icon: health,
    },
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    getCampaignById(parseInt(id))
    .then(campaign => {
      this.setState({campaign});
      return campaign;
    })
    .then(campaign => {
      campaign.entities.forEach(entity => {
        entity.needs.forEach(need => {
          this.possibleNeeds[need[0]].available += need[1];
          this.possibleNeeds[need[0]].needed += need[2];
        })
      })
    })
    .then(() => this.setState({ needs: this.possibleNeeds }));
  }

  Campaign = ({classes, campaign}) => (
    <>
      <Grid container justify="space-between" alignItems="center" className={classes.campaignContainer}>
        <Grid item>
          <Typography className={classes.campaignTitle} variant="h6">{campaign.name}</Typography>
          <Typography variant="subtitle2">{campaign.Location[2]} - {campaign.startDate || '21/07/2019'}</Typography>
        </Grid>
        <Grid item>
          <Icon className={classes[`gravity${campaign.gravity}`]} fontSize='large'>
            warning
          </Icon>
        </Grid>
      </Grid>

      <GridList className={classes.needs} cellHeight={'auto'} cols={3}>
        {Object.keys(this.possibleNeeds).map(need => (
          this.possibleNeeds[need].needed > 0 &&
          <GridListTile className={classes.campaignNeed}>
            <div>
              <img className={classes.campaignNeedIcon} src={this.possibleNeeds[need].icon} alt="need" />
              <Typography>{need}</Typography>
              <Typography>{(this.possibleNeeds[need].needed/this.possibleNeeds[need].available).toFixed(2)}{'%'}</Typography>
            </div>
          </GridListTile>
        ))}
      </GridList>
    </>
  );

  Entity = ({classes, entity}) => (
    <div>
      <Grid container justify="space-between" alignItems="center" >
        <Grid item>
          <Typography variant="h6">{entity.name || 'Nome da Entidade'}</Typography>
          <div className={classes.entityContact}>
            <Typography variant="body1">{entity.Address}</Typography>
            <br />
            <Typography variant="body1">{entity.Phone}</Typography>
          </div>
        </Grid>
        <Grid item>
        </Grid>
      </Grid>
      <Divider />
    </div>
  )

  render() {
    const { classes } = this.props;
    const { campaign } = this.state;

    console.log(campaign)

    return (this.state.campaign &&
      <>
        <Header title="Visualizar Campanha" />
        <div className={classes.container}>
          <this.Campaign classes={classes} campaign={campaign} />
          <div className={classes.entityList}>
            <Typography variant="h5">Entidades mais próximas</Typography>
            {campaign.entities.map(entity => (
              <this.Entity classes={classes} entity={entity} />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(Entities);
