import React from 'react'
import Navbar from "../Components/Navbar"
import Share from "../Components/Share"
import 'bootstrap/dist/css/bootstrap.min.css';
import RightSideForum from '../Components/RightSideForum';
import {Grid} from "@mui/material"
import Groups from '../Components/Forum/Groups';
import FeedForum from '../Components/Forum/FeedForum';

const Forum = () => {
    return (
        <>
           <div>
            <Navbar />
           </div>
           <Grid container spacing={2} padding={5}>
                <Grid item xs={12} sm={4} md={3} style={{ borderRight: "1px solid #228B22" }}>
                    <Groups/>
                </Grid>
                <Grid item xs={12} sm={8} md={6} style={{ borderRight: "1px solid #228B22" }}>
                    <FeedForum/>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    
                </Grid>
            </Grid>
        </>
        
    )
}

export default Forum;