import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../Styling/Profile.css"
import {Grid, Avatar, Divider, Alert, Typography} from "@mui/material"
import AccountBoxIcon from '@mui/icons-material/AccountBox';


const About = (profileImage, aboutUser, phonenumber, emailContact) => {

  return (
    <>
    <Grid container  style={{ padding: '100px' }} spacing={1}>
        <Grid item row xs={8} style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between' }}>
              <Divider/>
              <Grid  container padding = {5} justifyContent="space-between">
                <Grid item justifyContent = "center" xs = {6}>
                  <Typography variant = "h4" style={{ fontWeight: 'bold' }} ><AccountBoxIcon style={{fontSize: '30px'}}/>About user</Typography>
                    <Avatar src={`http://localhost:3001/profileimages/` + profileImage} alt="Profile Image"/>
                </Grid>
                <Grid item padding= {2} xs = {12}>
                  <Typography style={{ fontWeight: 'bold' }}>About</Typography>
                      <Typography>{aboutUser}</Typography>  
                </Grid>
                <Grid item padding= {2} xs = {12}>
                  <Typography style={{ fontWeight: 'bold' }}>Phone Number</Typography>
                    <Typography>{phonenumber}</Typography>
                </Grid>
                <Grid item padding= {2} xs = {12}>
                    <Typography style={{ fontWeight: 'bold' }}>Contact Email</Typography>
                        <Typography>{emailContact}</Typography>
                </Grid>
              </Grid>
        </Grid>
    </Grid>
    </>
	);
};

export default About;
