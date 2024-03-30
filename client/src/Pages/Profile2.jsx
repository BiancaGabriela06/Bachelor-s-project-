import {React, useState, useEffect} from 'react';
import axios from 'axios';
import {NavLink, useNavigate} from 'react-router-dom'
import {Grid, Avatar, Card, CardMedia, Typography, Button, TextField, Autocomplete} from "@mui/material"
import PsychologyIcon from '@mui/icons-material/Psychology';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import CollectionsIcon from '@mui/icons-material/Collections';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Navbar from "../Components/Navbar"
import UserPostsProfile from '../Components/UserPostsProfile';
import Footer from '../Components/Footer';

const Profile = () => {

    const navigate = useNavigate();
    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
    const [datemember, setDateMember] = useState("");
    const [file, setFile] = useState("");
    const [places, setPlaces] = useState([])
    const [location, setLocation] = useState("")
    var [profileImage, setProfileImage] = useState();
    const [post, setPost] = useState({
        username: "",
        filename: "",
        description: "",
        location: ""
    });

    useEffect(() => {
        const fetchData1 = async () => {
        try {
            const response = await axios.post('http://localhost:3001/image/user', { username });
            if (response.data.Status === 'Success') {
            console.log(response.data.Data);
            setProfileImage(response.data.Data);
            } else {
            console.log(response.err);
            }
        } catch (error) {
            console.error(error);
        }
        };

        const fetchData2 = async () => {
            try {
                const response = await axios.post('http://localhost:3001/user/info', { username });
                if (response.data.Status === 'Success') {
                  setDateMember(response.data.Data.datemembership);
                } else {
                console.log(response.err);
                }
            } catch (error) {
                console.error(error);
            }
            };
        
            const fetchData3 = async () => {
                try {
                    const response = await axios.get('http://localhost:3001/places/listofcities');
                    if (response.data.Status === 'Success') {
                        setPlaces(response.data.Data);
                    } else {
                        console.log(response.data.err);
                    }
                } catch (error) {
                    console.log(error);
                }

     }
        console.log(profileImage);

        fetchData3();
        fetchData2();
        fetchData1();
    }, []);


    const fileHandler = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
      
        const formdata = new FormData();
        formdata.append('file', selectedFile);
      
        try {
          const response = await axios.post('http://localhost:3001/image/post', formdata);
      
          if (response.data.Status === 'Success') {
            post.filename = response.data.filename;
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };

    const sharePost = () => {
        post.username = username;
        console.log(post);

        axios.post('http://localhost:3001/posts/sharepost', post)
        .then(res => {
              if(res.data.Status === 'Success') {
                   post.filename =""
                   setFile("")
                   navigate("/profile2")
              }
              else{
                 console.log(res.data.Error)
              }
        })
        .catch(err => console.log(err))

 }

    return (
        <>
            <div>
                <Navbar/>
            </div>
            
            <Grid container  style={{ padding: '100px' }} spacing={1}>
                  <Grid item xs={4} align="center" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <Avatar src={`http://localhost:3001/profileimages/` + profileImage} alt="Profile Image"/>

                       <Typography variant="h4" >{username}</Typography>
                       <Typography>Member since 23-07-2023{datemember}</Typography>
                       <Button href="/tripplanner">Trip intineraries</Button>
                       
                  </Grid>
                  <Grid item row xs={8} style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between' }}>


                           <Grid container justifyContent="space-between" style={{padding: '10px', margin: '10px'}}>
                                <Button href="/profile2" sx={{ color: '#228B22', fontSize: '13px' }}><PsychologyIcon sx ={{fontSize: '24px'}}/> Timeline</Button>
                                <Button href="/profile/about" sx={{ color: '#228B22', fontSize: '13px' }}><FolderSharedIcon sx ={{fontSize: '24px'}}/> About</Button>
                                <Button href="/profile/gallery" sx={{ color: '#228B22', fontSize: '13px' }}><CollectionsIcon sx ={{fontSize: '24px'}}/> Gallery</Button>
                            </Grid>
                            
                        <Grid container justifyContent="center">
                            <UserPostsProfile/>  
                        </Grid>
                         
                  </Grid>
                 
            </Grid>
            <Footer/>
        </>
    )
}

export default Profile;