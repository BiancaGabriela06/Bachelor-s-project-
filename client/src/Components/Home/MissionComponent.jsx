import React from "react"
import {Grid, Typography, Box} from "@mui/material"

const MissionComponent = () => {
    return (
        <>
       
       <Box style={{background: "linear-gradient(180deg, #65A388, #c4e4e8)"}} sx={{ justifyContent: "center", textAlign: "center" }}>
        
        <Typography  variant="h2" style={{ fontWeight: 'bold' }}>OUR MISSION</Typography>
        <Grid padding={10} sx={{display: "flex"}}>
           <Grid item padding={10}>
                
                    <Typography variant="h3">
                    At EcoVoyage, our mission transcends mere travel; it's a commitment 
                    to nurturing a world where exploration meets responsibility. With every journey, 
                    we strive to ignite a global movement towards sustainability, 
                    fostering connections with nature, cultures, and communities. 
                    </Typography>
           </Grid>
           <Grid item padding={10}>
               
                <Typography variant="h3">
                Our dedication lies in crafting experiences that not only enrich lives
                 but also safeguard the planet for generations to come. Join us 
                in our quest to redefine travel, as we embark on a voyage towards a greener,
                 more conscious future.
                </Typography>
           </Grid>
        </Grid>
       </Box>
       
        </>
    )
}

export default MissionComponent