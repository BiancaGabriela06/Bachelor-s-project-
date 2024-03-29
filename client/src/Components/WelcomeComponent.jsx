import React from "react"
import {Grid, Divider} from "@mui/material"
import { motion } from "framer-motion";
import girl_bicycle from "../assets/images/girl_bicycle.png"
import { Navigate, useNavigate } from "react-router-dom";

const WelcomeComponent = () => {

    const message1 = "The planet need you now, not later. ".split(" ")
    const message2 = "Small changes are big steps".split(" ")
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/trip");
    }

    return (
        <>

        <Grid container spacing={2} style={{background: "linear-gradient(180deg, #288c24, #65A388)", padding: '100px'}}>
            <Grid item xs = {6} style={{justifyContent: 'center'}}>
                {message1.map((el, i) => ( <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{
                    duration: 1.0,
                    delay: i / 10,
                }} key={i} style = {{fontSize: '50px'}} > {el}{" "} </motion.span>))}

                 {message2.map((el, i) => ( <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{
                    duration: 1.0,
                    delay: i / 10,
                }} key={i} style = {{fontSize: '50px'}} > {el}{" "} </motion.span>))}
                 <Divider/>
                <motion.button style={{margin: '50px auto', justifyContent: 'center'}}
                    onClick={handleClick}
                    whileHover={{ scale: 1.1,  backgroundColor: "#4CAF50", color: "#FFFFFF" }} 
                    whileTap={{ scale: 0.9,  padding: "10px 20px", 
                    fontSize: "25px", 
                    border: "none", 
                    borderRadius: "5px", 
                    cursor: "pointer"  }}>START</motion.button>             
            </Grid>
            <Grid item  xs= {6}>
                <img src={girl_bicycle}></img>
            </Grid>
            <Grid item >
            
            </Grid>
                
        </Grid>
        </>
    )
}

export default WelcomeComponent