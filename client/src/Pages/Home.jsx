import React from "react";
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import Backpack from "../Components/Backpack3D";
import pikbig from "../assets/images/instructionspik.jpg"
import ScrollAnimation from "../Components/ScrollAnimation";
import WelcomeComponent from "../Components/WelcomeComponent";
import MissionComponent from "../Components/MissionComponent";
import FunctionsWebsite from "../Components/FunctionsWebsite";
import ReviewUsers from "../Components/ReviewUsers";
import {motion, useScroll} from "framer-motion";

const Home = () => {

    const { scrollYProgress } = useScroll()
    return (
       <>
      <div>
       <Navbar/>
      </div>
      <motion.path
      d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
      style={{ pathLength: scrollYProgress }}
    />
      <div>
       <WelcomeComponent/>
       <MissionComponent/>
       <ScrollAnimation/>
       <FunctionsWebsite/>
       <ReviewUsers/>
      </div>
      <div>
        <Footer/>
      </div>
      </>
      
);
    }    

export default Home;