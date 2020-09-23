import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import ContentLoader from 'react-content-loader';
import RefreshIcon from '@material-ui/icons/Refresh';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {marginTop: '40px' },
  media: {
    height: '100px',
    paddingTop: '56.25%' 
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
}));

function App() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      let res = await fetch('https://randomuser.me/api');
      let data = await res.json();
      setUserData(data.results[0]);
      setIsLoading(false);
    } catch (er) {
      console.error('error', er);
    }
  }

  function refresher (){
    setIsLoading(true);
    fetchData();
  }


  return (
    <Grid container alignItems="center" justify="center" direction="column" className={classes.root} >
         
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={400}
          height={300}
          viewBox="0 0 400 300"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={{ marginLeft: '180px' }}>
          <rect x="-1" y="2" rx="0" ry="0" width="200" height="211" />
          <circle cx="35" cy="254" r="26" />
          <rect x="75" y="238" rx="0" ry="0" width="114" height="10" />
          <rect x="75" y="259" rx="0" ry="0" width="114" height="11" />
        </ContentLoader>
      ) : (
        <Card >
          <CardMedia className={classes.media} image={userData.picture.large} title="Paella dish" />
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {userData.name.first[0]}
              </Avatar>
            }
            action={
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more">
                <ExpandMoreIcon />
              </IconButton>
            }
            title={userData.name.first + ' ' + userData.name.last}
            subheader={userData.login.username}
          />

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Grid container direction="column" alignItems="stretch">
                <Grid item>
                  <IconButton aria-label="add to favorites">
                    <MailIcon />
                  </IconButton>
                  {userData.email}
                </Grid>
                <Grid item>
                  <IconButton aria-label="share">
                    <PhoneIcon />
                  </IconButton>
                  {userData.cell}
                </Grid>
                <Grid item>
                  <IconButton aria-label="share">
                    <LocationIcon />
                  </IconButton>
                  {userData.location.street.name + ', ' + userData.location.city}
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Card>
                     
       
      )}
      <IconButton aria-label="share">
        < RefreshIcon onClick={refresher}/>
      </IconButton>
    </Grid>
  );
}

export default App;
