import React, {useRef} from "react";
import {motion, useScroll, useTransform} from "framer-motion"
import {Grid} from "@mui/material"
import "../Styling/ScrollAnimation.css";


const ScrollAnimation = () => {

    const ref = useRef()

    const {scrollYProgress} = useScroll({
        target: ref
    })

    const yBg = useTransform(scrollYProgress, [0,1], ["-300%", "300%"])

    return (
        <>
        <Grid>
        <div className="parallax" style={{padding: "500px", background: "linear-gradient(180deg, #C7ECF1, #B5BCBD)"}}>
               <motion.div className="tourist"></motion.div>
               <motion.div className="plane" style={{x: yBg}}></motion.div>
               
        </div>
        </Grid>
        </>
    

    )

}

export default ScrollAnimation;