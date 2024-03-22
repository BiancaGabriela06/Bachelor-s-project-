import React, {useEffect, useState} from 'react'
import {Grid, Avatar, Card, CardMedia, Typography, Button, TextField, Autocomplete} from "@mui/material"
import PsychologyIcon from '@mui/icons-material/Psychology';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import CollectionsIcon from '@mui/icons-material/Collections';
import "../Styling/Gallery.css"
import Navbar from "../Components/Navbar"
import axios from 'axios'

const GalleryProfile = () => {

    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
    const [photos, setPhotoGallery] = useState([])
    const [datemember, setDateMember] = useState("");
    var [profileImage, setProfileImage] = useState("");
    var [coverImage, setCoverProfile] = useState();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3001/share/images', {
                params: {
                  username: username // înlocuiește cu variabila ta de stare
                }
            });
            if (response.data.Status === 'Success') {
              setPhotoGallery(response.data.data);
            } else {
              console.log(response.err);
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);

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
     )
}

export default GalleryProfile;