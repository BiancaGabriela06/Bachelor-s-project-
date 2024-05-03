import React, {useState} from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import {Divider, Grid, ListItem, Typography} from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RowingIcon from '@mui/icons-material/Rowing';
import TungstenIcon from '@mui/icons-material/Tungsten';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import CalculateIcon from '@mui/icons-material/Calculate';


export default function SwipeableTemporaryDrawer() {
  const [state, setState] = useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      alignItems="center"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
   
      <Grid container padding={5} justifyContent="center">
        <Grid item xs={4} >
            <Typography variant="h3" paragraph>Do you want to enjoy new places?</Typography>
            <Typography variant="h5" paragraph>Open your heart to new opportunities
            and enjoy local restaurant. Small changes in your way to travel save our ecosystem in 
            a way you couldn't image.</Typography>
            <Typography variant="h5">After you complete trip's info you gonna receive all you need to now
                for you trip.
            </Typography>
        </Grid>
        <Grid item xs={4}>
        <Typography variant="h3">How can you use our platform in you interest?</Typography>
         <List>
            <ListItem><CalculateIcon color="success"/>Calculate Co2 emissions for a trip</ListItem>
            <Divider component="li" />
            <ListItem><FlightIcon color="success"/>Search for economy flights</ListItem>
            <Divider component="li" />
            <ListItem><RestaurantIcon color="success"/>Find local cuisine in you destination city</ListItem>
            <Divider component="li" />
            <ListItem><DirectionsBikeIcon color="success"/>Check local business of renting bikes to visit the city</ListItem>
            <Divider component="li" />
            <ListItem><RowingIcon color="success"/>You don't have any idea of activities? Find our ideas to spend the time in a new city</ListItem>
         </List>
        </Grid>
        
      </Grid>
    </Box>
  );

  const anchor = 'bottom'; // Specify the anchor for the bottom drawer

  return (
    <div>
      <Button onClick={toggleDrawer(anchor, true)} variant="outlined" color="success">How to</Button>
      <SwipeableDrawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
      >
        {list(anchor)}
      </SwipeableDrawer>
    </div>
  );
}
