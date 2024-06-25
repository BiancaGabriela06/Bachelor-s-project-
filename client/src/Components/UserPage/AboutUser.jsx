import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../Styling/Profile.css"
import {Grid, Avatar, Divider, Typography} from "@mui/material"
import AccountBoxIcon from '@mui/icons-material/AccountBox';


const About = ({profileImage, aboutUser, phonenumber, emailContact}) => {

  return (
    <>
     <Grid container style={{ marginLeft: '10rem' }} spacing={1}>
      <Grid item xs={8} style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Grid container padding={5} justifyContent="space-between">
          <Grid item>
            <Typography variant="h4" style={{ textAlign: 'center', fontWeight: 'bold' }}>
              <AccountBoxIcon style={{ fontSize: '2rem' }} />About user
            </Typography>
            <Avatar
              sx={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}
              src={`http://localhost:3001/profileimages/${profileImage}`}
              alt="Profile Image"
            />
          </Grid>
          <Grid item padding={2} xs={12}>
            <Typography variant="h4" style={{ fontWeight: 'bold' }}>About</Typography>
            <Typography variant="h4">{aboutUser}</Typography>
          </Grid>
          <Grid item padding={2} xs={12}>
            <Typography variant="h4" style={{ fontWeight: 'bold' }}>Phone Number</Typography>
            <Typography variant="h4">{phonenumber}</Typography>
          </Grid>
          <Grid item padding={2} xs={12}>
            <Typography variant="h4" style={{ fontWeight: 'bold' }}>Contact Email</Typography>
            <Typography variant="h4">{emailContact}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </>
	);
};

export default About;
