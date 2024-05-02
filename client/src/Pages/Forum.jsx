import React, {useState} from 'react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Grid} from "@mui/material"
import Groups from '../Components/Forum/Groups';
import FeedForum from '../Components/Forum/FeedForum';
import Users from "../Components/Forum/Users"
import OpenItinerary from '../Components/Itinerary/OpenItinerary';

const Forum = () => {
    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
    return (
        <>
           <div>
            <Navbar />
           </div>
           <Grid container spacing={2} padding={5} sx={{marginTop: '10rem'}}>
                <Grid item xs={12} sm={4} md={3} style={{ borderRight: "1px solid #228B22" }}>
                    <Groups username={username}/>
                </Grid>
                <Grid item xs={12} sm={8} md={6} style={{ borderRight: "1px solid #228B22" }}>
                    <FeedForum/>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Users/>
                </Grid>
            </Grid>
            <OpenItinerary/>
            <div>
                <Footer/>
            </div>
        </>
        
    )
}

export default Forum;