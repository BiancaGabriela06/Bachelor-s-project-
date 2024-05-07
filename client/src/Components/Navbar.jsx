import React from 'react'
import AfterLogin from './AfterLogin';
import { AppBar, Grid,  Avatar, Link} from '@mui/material';
import EcoVoyageLogo from '../assets/images/logo.png'



const Navbar = () => {
    var auth = localStorage.getItem("currentUser");
    
    return auth ? (
     <AppBar position="absolute" style={{ background: '#228B22', boxShadow: 'none' }}>
    <Grid container spacing = {30} rowSpacing={1} justifyContent= 'space-between' alignItems="center">
        <Grid item>
          <Link href="/home">
          <Avatar src={EcoVoyageLogo} alt="EcoVoyageLogo" style={{ padding: 5, width: '80px', height: '80px' }}/>
            </Link>  
        </Grid>
        <Grid item  sx={{ color: 'white',  display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
        <Link  href="/home" sx={{
                        color: 'white', fontSize: '2rem', textDecoration: 'none', marginRight: '5rem', 
                        '&:hover': {
                        fontWeight: 'bold', color: 'white', textDecoration: 'none'
                        },
                        '&:active': {
                        fontWeight: 'bold', color: 'white', textDecoration: 'none'
                        },
                    }} >Home</Link>

               <Link href="/trip" sx={{
                        color: 'white', fontSize: '2rem', textDecoration: 'none', marginRight: '5rem', 
                        '&:hover': {
                        fontWeight: 'bold', color: 'white', textDecoration: 'none'},
                        '&:active': {
                        fontWeight: 'bold', color: 'white', textDecoration: 'none'
                        },
                    }}>Plan your trip</Link>
               <Link href="/forum" sx={{
                        color: 'white', fontSize: '2rem', textDecoration: 'none', marginRight: '5rem', 
                        '&:hover': {
                        fontWeight: 'bold', color: 'white', textDecoration: 'none' },
                        '&:active': {
                        fontWeight: 'bold', color: 'white', textDecoration: 'none'
                        },
                    }}>Forum</Link>
               <Link href="/explore" sx={{
                        color: 'white', fontSize: '2rem', textDecoration: 'none', marginRight: '5rem', 
                        '&:hover': {
                        fontWeight: 'bold', color: 'white', textDecoration: 'none'
                        },
                        '&:active': {
                        fontWeight: 'bold', color: 'white', textDecoration: 'none'
                        },
                    }}>Explore</Link>
        </Grid>
        <Grid item>
            <AfterLogin />
        </Grid>
    </Grid>
</AppBar>

    ): (
     <AppBar position='absolute' style={{ background: '#228B22'}}>
        <Grid container  rowSpacing={1} sx={{ flexGrow: 1 }} justifyContent="center" alignItems="center">
            <Grid item>
                <Avatar src={EcoVoyageLogo} alt="EcoVoyageLogo" style={{ padding: 5, width: '100px', height: '100px' }} />
            </Grid>
        </Grid>
     </AppBar>
    );
  }

export default Navbar;
