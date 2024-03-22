import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {NavLink, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Components/Navbar'
import "../Styling/Profile.css"
import {Grid, Avatar, Card, CardMedia, Typography, Button, TextField, Autocomplete} from "@mui/material"
import PsychologyIcon from '@mui/icons-material/Psychology';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import CollectionsIcon from '@mui/icons-material/Collections';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const About = () => {

  const navigate = useNavigate();
  const [datemember, setDateMember] = useState("");
  var [profileImage, setProfileImage] = useState("");
  var [coverImage, setCoverProfile] = useState();
  var currentUser = localStorage.getItem("currentUser");
  const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
  

  var [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/image/user', { username });
        if (response.data.Status === 'Success') {
          setProfileImage(response.data.profileimage);
        } else {
          console.log(response.err);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const settingsButton = (e) => {
    navigate("/profilesettings");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get('http://localhost:3001/users/userinfo', {
          params: {
            username: username 
          }
      });
        if(response.data.Status === 'Success'){
          setUserInfo(response.data.data)
        }

      }catch(error) {
        console.error(error);
      }
    };

    fetchData();
  }, [])
  
  return (
    <>
    <div>
         <Navbar/>
      </div>
    <Grid container  style={{ padding: '100px' }} spacing={1}>
        <Grid item xs={4} align="center" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Avatar src={profileImage} alt={username} style={{ padding: 40, width: '80px', height: '80px', marginTop: '70px'}}></Avatar>
            <Typography variant="h4" >{username}</Typography>
            <Typography>Member since 23-07-2023{datemember}</Typography>
            <Button href="/tripplanner">Trip intineraries</Button>
            
        </Grid>
        <Grid item row xs={8} style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between' }}>
              <Card sx = {{maxWidth: 345}}>
                    <CardMedia component="img" alt = "cover" height="140" image = {coverImage} />
              </Card>

              <Grid container justifyContent="space-between" style={{padding: '10px', margin: '10px'}}>
                    <Button href="/profile2" sx={{ color: '#228B22', fontSize: '13px' }}><PsychologyIcon sx ={{fontSize: '24px'}}/> Timeline</Button>
                    <Button href="/about" sx={{ color: '#228B22', fontSize: '13px' }}><FolderSharedIcon sx ={{fontSize: '24px'}}/> About</Button>
                    <Button href="/gallery" sx={{ color: '#228B22', fontSize: '13px' }}><CollectionsIcon sx ={{fontSize: '24px'}}/> Gallery</Button>
                </Grid>
        </Grid>
    </Grid>
    </>
	);
};

export default About;
