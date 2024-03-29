import React, {useEffect, axios, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import {Grid, Typography, Divider, Button} from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const Explore = () => {
  const navigate =  useNavigate();
  const [admin, setAdmin] = useState(0);

  

   const handleClick = () =>{
     navigate("/dashboardadmin")
   }

      return (
        <>
        <Navbar/>
        <Grid container>
          <Typography>News in eco-toursim</Typography>
          <Divider/>
          {admin && ( 
            <Button onClick={handleClick}><AddCircleOutlineIcon/></Button>
             )}
        </Grid>

        <Footer/>
        </>
      )
}

export default Explore