import React, {useState} from 'react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Grid} from "@mui/material"
import Groups from '../Components/Forum/Groups';
import FeedForum from '../Components/Forum/FeedForum';
import Users from "../Components/Forum/Users"
import OpenItinerary from '../Components/Itinerary/OpenItinerary';
import Feedback from "../Components/Feedback";

const Forum = () => {
    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleGroupSelect = (group) => {
        setSelectedGroup(group);
        console.log(selectedGroup);
    };

    return (
        <>
           <div>
            <Navbar />
           </div>
           <Grid container spacing={2} padding={5} sx={{marginTop: '10rem'}}>
                <Grid item xs={12} sm={4} md={3} style={{ borderRight: "1px solid #228B22" }}>
                    <Groups  onSelect={handleGroupSelect}/>
                </Grid>
                <Grid item xs={12} sm={8} md={6} style={{ borderRight: "1px solid #228B22" }}>
                    <FeedForum selectedGroup={selectedGroup}/>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Users/>
                </Grid>
            </Grid>
            <OpenItinerary/>
            <Feedback/>
            <div>
                <Footer/>
            </div>
        </>
        
    )
}

export default Forum;