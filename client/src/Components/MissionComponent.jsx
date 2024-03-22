import React from "react"
import {Grid, Paper, Typography, Box} from "@mui/material"

const MissionComponent = () => {
    return (
        <>
       
       <Box style={{background: "linear-gradient(180deg, #65A388, #c4e4e8)"}} sx={{ justifyContent: "center", textAlign: "center" }}>
        <Typography  variant="h3">OUR MISSION</Typography>
        <Grid padding={10} sx={{display: "flex"}}>
           <Grid item padding={10}>
                
                    <Typography variant="h5">We offer you a dadicated space for travel, all you need in a single place. 
                        Our mission is to discover new places, be the first in your group of friends to go somewhere, and be prepared for the culture.
                        The most important, We think that traveling is our time to get relaxed and some way, everybody thins this. **some info about the Co2 
                        for toursits*. We promovate smart choices, local business and good vibes. 
                        What is special about our platform is that you can keep the past, the present and the future under just some simple clicks.
                        
                    </Typography>
           </Grid>
           <Grid item padding={10}>
               
                <Typography variant="h5">The hardest part of a trip is the research you made before the trip. On EcoVoyage, just tell assistant Karlos where do you want to go 
                        and he's gonna sugest flights, local restaurant, local business to rent bikes, info about city and also, you can calculate the Co2 emissions 
                        for the way to and back. Don't forget to post your trip for other tourists. Also, your account is like a journal. Keep your trips track 
                        and we can give to you how much money you spend and smart differences you made in the world. 
                </Typography>
           </Grid>
        </Grid>
       </Box>
       
        </>
    )
}

export default MissionComponent