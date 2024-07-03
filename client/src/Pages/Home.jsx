import React, {useState, useEffect} from "react";
import axios from "axios"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import ScrollAnimation from "../Components/Home/ScrollAnimation";
import WelcomeComponent from "../Components/Home/WelcomeComponent";
import MissionComponent from "../Components/Home/MissionComponent";
import ReviewUsers from "../Components/Home/ReviewUsers";
import Notification from "../Components/Itinerary/Notification"

const Home = () => {

    const [alert, setAlert] = useState(0);
    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
    const [nextTrip, setNextTrip] = useState("");

    const handleCloseNotification = () => {
      setNextTrip(null);
    };

    useEffect(() => {
      const fetchData3 = async () => {
        try {
            const response = await axios.get('http://localhost:3001/itinerary/soonesttrip', {params: {
              username: username,
               }
            });
            if (response.data.Status === 'Success') {
                setNextTrip(response.data.Data);
            } else {
                console.log(response.data.err);
            }
        } catch (error) {
            console.log(error);
        }}

      fetchData3();
    }, [])

    return (
       <>
      <div>
       <Navbar/>
      </div>
      <div style={{marginTop: '12rem'}}>
          <WelcomeComponent/>
          <MissionComponent/>
          <ScrollAnimation/>
          <ReviewUsers/>
          {nextTrip && <Notification itinerary={nextTrip} onClose={handleCloseNotification} />}
      </div>
      <div>
        <Footer/>
      </div>
      </>
      
);
    }    

export default Home;