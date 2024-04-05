import React, {useState, useEffect} from "react";
import axios from "axios"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import ScrollAnimation from "../Components/ScrollAnimation";
import WelcomeComponent from "../Components/WelcomeComponent";
import MissionComponent from "../Components/MissionComponent";
import FunctionsWebsite from "../Components/FunctionsWebsite";
import ReviewUsers from "../Components/ReviewUsers";

const Home = () => {

    const [alert, setAlert] = useState(0);
    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));

    useEffect(() => {
      const fetchData1 = async () => {
        try {
          const response = await axios.get('http://localhost:3001/groups/needgroup', {params: {
            username: username,
             }});
          if (response.data.Status === 'Yes') {
            console.log("Da");
            setAlert(1);
          } else {
            console.log(response.err);
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData1();
    }, [])

    return (
       <>
      <div>
       <Navbar/>
      </div>
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