import React from 'react'
import Navbar from "../Components/Navbar"
import Share from "../Components/Share"
import 'bootstrap/dist/css/bootstrap.min.css';
import FeedForum from '../Components/FeedForum';
import RightSideForum from '../Components/RightSideForum';

const Forum = () => {
    return (
        <div>
            <Navbar />
            <div className="feed">
                <FeedForum/>
                <RightSideForum/>
            </div>
            

        </div>
    )
}

export default Forum;