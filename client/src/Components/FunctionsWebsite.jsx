import React from "react"
import {Grid, Typography} from "@mui/material"
import Backpack from "../Components/Backpack3D"
import {motion, useScroll, useTransform} from "framer-motion"

const FunctionsWebsite = () => {
    return (
        <>

        <Grid container style={{background: "linear-gradient(180deg, #B5BCBD, #8F9495)"}} sx={{ height: "500px", justifyContent: "center", textAlign: "center" }}>
            <Grid item >
                  <Backpack/>
            </Grid>
            <Grid item >
                <Typography>Get your backpack and start a new trip!</Typography>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>START</motion.button>
            </Grid>
     
        </Grid>
        </>
    )
}

export default FunctionsWebsite;