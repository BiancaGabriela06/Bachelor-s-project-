import React from "react"
import {Grid} from "@mui/material"
import { motion } from "framer-motion";
import girl_bicycle from "../assets/images/girl_bicycle.png"

const WelcomeComponent = () => {

    const message = "The planet need you now, not later. Small changes are big steps".split(" ")
    return (
        <>

        <Grid container style={{background: "linear-gradient(180deg, #288c24, #65A388)"}}>
            <Grid item xs = {12}>
                {message.map((el, i) => ( <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{
                    duration: 1.0,
                    delay: i / 10,
                }} key={i} > {el}{" "} </motion.span>))}
            </Grid>
            <Grid item xs >
                <img src={girl_bicycle}></img>
            </Grid>
                
        </Grid>
        </>
    )
}

export default WelcomeComponent