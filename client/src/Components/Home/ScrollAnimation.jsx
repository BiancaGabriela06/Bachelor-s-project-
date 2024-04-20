import React, {useRef} from "react";
import {motion, useScroll, useTransform} from "framer-motion"
import "../../Styling/ScrollAnimation.css";


const ScrollAnimation = () => {

    const ref = useRef()

    const {scrollYProgress} = useScroll({
        target: ref
    })

    const yBg = useTransform(scrollYProgress, [0,1], ["-1000%", "1000%"])

    return (
        <>
        <div className="parallax" style={{padding: "500px", background: "linear-gradient(180deg, #c4e4e8, #B5BCBD)"}}>
               <motion.div className="sky"></motion.div>
               <motion.div className="plane" style={{x: yBg}} transition={{ duration: 1 / 2 }}></motion.div>
               
        </div>
        </>
    

    )

}

export default ScrollAnimation;