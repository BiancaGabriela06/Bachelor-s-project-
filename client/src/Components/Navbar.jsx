import React, {useEffect, useState} from 'react'
import AfterLogin from './AfterLogin';
import { AppBar, Button, Grid,  Avatar} from '@mui/material';
import EcoVoyageLogo from '../assets/images/logo.png'



const Navbar = () => {
    var auth = localStorage.getItem("currentUser");
    
    return auth ? (
     <AppBar position="static" style={{ background: '#228B22' }}>
    <Grid container spacing = {30} rowSpacing={1} sx={{ flexGrow: 1 }} justifyContent= 'space-between' alignItems="center">
        <Grid item>
            <Avatar src={EcoVoyageLogo} alt="EcoVoyageLogo" style={{ padding: 5, width: '80px', height: '80px' }}/>
        </Grid>
        <Grid item  sx={{ color: 'white',  display: 'flex', justifyContent: 'center' }}>
               <Button href="/home" sx={{color: 'white', fontSize: '15px'}}>Home</Button>
               <Button href="/trip" sx={{color: 'white', fontSize: '15px'}}>Plan your trip</Button>
               <Button href="/forum" sx={{color: 'white', fontSize: '15px'}}>Forum</Button>
               <Button href="/explore" sx={{color: 'white', fontSize: '15px'}}>Explore</Button>
               <Button href="/about" sx={{color: 'white', fontSize: '15px'}}>About</Button> 
              
              
        </Grid>
        <Grid item>
            <AfterLogin />
        </Grid>
    </Grid>
</AppBar>

    ): (
     <AppBar style={{ background: '#228B22'}}>
        <Grid container  rowSpacing={1} sx={{ flexGrow: 1 }} justifyContent="center" alignItems="center">
            <Grid item>
                <Avatar src={EcoVoyageLogo} alt="EcoVoyageLogo" style={{ padding: 5, width: '100px', height: '100px' }} />
            </Grid>
        </Grid>
     </AppBar>
    );
  }

export default Navbar;
