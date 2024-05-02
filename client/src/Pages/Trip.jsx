import React, {useState} from 'react'
import Navbar from "../Components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import Map from "../Components/Map"
import BarSearchTrip from '../Components/InfoTrip/BarSearchTrip';
import {ImageList, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button} from '@mui/material';
import Footer from "../Components/Footer";
import cover from "../assets/images/cover.png";
import instructionspik from "../assets/images/instructionspik.jpg"
import picture_co2 from "../assets/images/co2pik_card.jpg";
import CalculatorCo2 from "../Components/InfoTrip/CalculatorCo2";
import Instructions from "../Components/InfoTrip/InstructionsTripPage"
import OpenItinerary from '../Components/Itinerary/OpenItinerary'

const Trip = () => {

    return (
       <>
      <div>
       <Navbar/>
       </div>

       <Grid container sx={{marginTop: '8rem'}}>
           <img src={cover} style={{ width: "100%", position: "center"}} alt="Cover Trip"/>
        </Grid>  
      
       <Grid container padding = {5} justifyContent="center">
            <Grid item justifyContent="center">
                  <BarSearchTrip/>
            </Grid>
        </Grid>
        <Grid container padding = {1} >
          <Grid item padding={1} sx={{ marginLeft: '200px' }}>
          <Card sx={{width: 345, height: 345}}>
          <CardMedia sx={{ height: 140 }} image={picture_co2} title="co2emission"/>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Calculator Co2 emissions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Plan eco-conscious trips with our CO2 Emission Calculator. 
                Enter origin, destination, transportation type, and passenger 
                count for instant carbon footprint estimates.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small"><CalculatorCo2/></Button>
              </CardActions>
       </Card>
          </Grid>
          <Grid item padding={1}>
              <Grid item >
                  <Card sx={{ width: 345, height: 345 }}>
                  <CardMedia sx={{ height: 140 }} image={instructionspik} title="co2emission"/>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      New on EcoVoyage?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Eco Voyage offers you all the help you need to plan you eco-trip.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small"><Instructions/></Button>
                  </CardActions>
                  </Card>
              </Grid>
            
          </Grid>
        <OpenItinerary/>
       </Grid>
      <div>
        <Footer/>
      </div>
       
      </>
);
}

export default Trip;