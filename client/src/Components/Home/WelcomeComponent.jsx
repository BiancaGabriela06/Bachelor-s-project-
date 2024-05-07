import React from "react"
import {Grid, Divider, Button} from "@mui/material"
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const WelcomeComponent = () => {

    const message1 = "Discover the World Responsibly: ".split(" ")
    const message2 = "EcoVoyage - Your Passport to Sustainable Travel Experiences!".split(" ")
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/trip");
    }

    return (
        <>

        <Grid container padding = {5} spacing={5} style={{background: "linear-gradient(180deg, #288c24, #65A388)", padding: '18rem'}}>
            <Grid item  style={{justifyContent: 'center'}}>
                {message1.map((el, i) => ( <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{
                    duration: 1.0,
                    delay: i / 10,
                }} key={i} style = {{fontSize: '50px', color: 'white'}} > {el}{" "} </motion.span>))}

                 {message2.map((el, i) => ( <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{
                    duration: 1.0,
                    delay: i / 10,
                }} key={i} style = {{fontSize: '50px', color: 'white'}} > {el}{" "} </motion.span>))}
                 <Divider/>
            <Grid item style={{ marginTop: '2rem',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={handleClick} sx={{fontSize: '1.5rem'}} variant="contained" size="large" color="success" >LET'S BEGIN</Button>  
            </Grid>
                          
            </Grid>
                
        </Grid>
        </>
    )
}

export default WelcomeComponent