import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {NavLink, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Components/Navbar'
import "../Styling/Profile.css"
import {Grid, Avatar, Divider, Alert, Typography, Button, TextField, Autocomplete} from "@mui/material"
import PsychologyIcon from '@mui/icons-material/Psychology';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import CollectionsIcon from '@mui/icons-material/Collections';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CheckIcon from "@mui/icons-material/Check"

const About = () => {

  const navigate = useNavigate();
  const [datemember, setDateMember] = useState("");
  var [editInfo, setEditInfo] = useState(0);
  var [profileImage, setProfileImage] = useState();
  
  const [alertSucces, setAlertSucces] = useState(0);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  var currentUser = localStorage.getItem("currentUser");
  const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
  const [values, setValues] = useState({
    username: username,
    aboutUser: "",
    phonenumber: "",
    emailContact: ""
});
  
  const [file, setFile] = useState();
  const handleFile = (e) => {setFile(e.target.files[0])}

  var [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.post('http://localhost:3001/image/user', { username });
        if (response.data.Status === 'Success') {
          console.log("Photo About section " + response.data.Data)
          setProfileImage(response.data.Data);
        } else {
          console.log(response.err);
        }
      } catch (error) {
        console.error(error);
      }
    };
 
    fetchData1();
    const fetchData2 = async () => {
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
      }}
      fetchData2();
  }, [username]);
  
  const saveData = () => {
    axios.put('http://localhost:3001/users/editinfo', values)
    .then(res => {
        if(res.data.Status === 'Success'){
            setUserInfo(res.data.Data);
            setEditInfo(0);
            setAlertSucces(1);
            window.location.reload(false);
        }
        else if(res.data.Status === 'Error'){
           setError(res.data.Error);
        }
    })
    .catch(err => console.log(err))
  }

  const imageHandler = async () => {
    try {
      const formdata = new FormData();
      formdata.append('file', file);

      const response = await axios.post('http://localhost:3001/image/profile', formdata);
      if (response.data.Status === 'Success') {
        const values = {
          user: username,
          filename: response.data.filename
        };

        const userResponse = await axios.post('http://localhost:3001/image/profile/user', values);
        if (userResponse.data.Status === 'Success') {
              setMessage("Photo updated")
          } 
        else {
            console.log(userResponse.err);
          }
        }
    
    } catch (error) {
      console.error(error);
    }
  };
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
                    <Button href="/about" sx={{ color: '#228B22', fontSize: '13px' }}><FolderSharedIcon sx ={{fontSize: '24px'}}/> About</Button>
                    <Button href="/gallery" sx={{ color: '#228B22', fontSize: '13px' }}><CollectionsIcon sx ={{fontSize: '24px'}}/> Gallery</Button>
                </Grid>
              <Divider/>
              <Grid  container padding = {5} justifyContent="space-between">
                <Grid item justifyContent = "center" xs = {6}>
                  <Typography variant = "h4" style={{ fontWeight: 'bold' }} ><AccountBoxIcon style={{fontSize: '30px'}}/>About user</Typography>
                  {editInfo === 0 ? (
                    <Avatar src={`http://localhost:3001/profileimages/` + profileImage} alt="Profile Image"/>
                  ) : (
                    <Grid>
                       <Avatar src={`http://localhost:3001/profileimages/` + profileImage} alt="Profile Image"/>
                        <input
                          type="file"
                          name="profile"
                          accept="image/*"
                          className="form-control"
                          onChange={handleFile}
                        />
                        <Button onClick={imageHandler}> Change Profile Image </Button>
                        {message && (
                          <Grid item xs={12}>
                            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                              {message}
                            </Alert>
                          </Grid>
                        )}
                    </Grid>
                   
                  )}
                </Grid>
                <Grid item padding= {2} xs = {12}>
                  <Typography style={{ fontWeight: 'bold' }}>About</Typography>
                   {editInfo === 0 ? (
                    <Typography>{userInfo.aboutUser}</Typography>
                   ) : (
                     <TextField defaultValue={userInfo.aboutUser}
                     onChange={e => { 
                        setValues({...values, aboutUser: e.target.value});
                      }} ></TextField>
                   )}
                </Grid>
                <Grid item padding= {2} xs = {12}>
                  <Typography style={{ fontWeight: 'bold' }}>Phone Number</Typography>
                  {editInfo === 0 ? (
                    <Typography>{userInfo.phonenumber}</Typography>
                   ) : (
                     <TextField onChange = {e => setValues({...values, phonenumber: e.target.value})} defaultValue={userInfo.phonenumber}></TextField>
                   )}
                </Grid>
                <Grid item padding= {2} xs = {12}>
                <Typography style={{ fontWeight: 'bold' }}>Contact Email</Typography>
                  {editInfo === 0 ? (
                    <Typography>{userInfo.emailContact}</Typography>
                   ) : (
                     <TextField onChange = {e => setValues({...values, emailContact: e.target.value})} defaultValue={userInfo.emailContact}></TextField>
                   )}
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Button variant = "outlined" onClick={(e) => setEditInfo(1)}>Edit</Button>
                {editInfo === 1 ? (
                  <Button variant = "outlined" onClick = {saveData}>Save</Button>
                ) : <Typography/>}
              </Grid>
        </Grid>
    </Grid>
    </>
	);
};

export default About;
