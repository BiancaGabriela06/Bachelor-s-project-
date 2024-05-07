import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../Styling/Profile.css"
import {Grid, Avatar,  Alert, Typography, Button, TextField} from "@mui/material"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CheckIcon from "@mui/icons-material/Check"

const About = () => {

  const navigate = useNavigate();
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
          console.log(response.data.Data);
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
    <Grid container  style={{ marginLeft: '10rem'}} spacing={1}>
      
        <Grid item row xs={8} style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between' }}>
              <Grid  container padding = {5} justifyContent="space-between">
                <Grid item justifyContent = "center" >
                  
                  <Typography variant = "h4" style={{textAlign: 'center', fontWeight: 'bold' }} ><AccountBoxIcon style={{fontSize: '2rem'}}/>About user</Typography>
                  {editInfo === 0 ? (
                    <Avatar sx={{marginTop: '1.5rem', marginBottom: '1.5rem'}} src={`http://localhost:3001/profileimages/` + profileImage} alt="Profile Image"/>
                  ) : (
                    <Grid>
                       <Avatar sx={{marginTop: '1.5rem', marginBottom: '1.5rem'}} src={`http://localhost:3001/profileimages/` + profileImage} alt="Profile Image"/>
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
                  <Typography variant="h4"   style={{ fontWeight: 'bold' }}>About</Typography>
                   {editInfo === 0 ? (
                    <Typography variant="h4">{userInfo.aboutUser}</Typography>
                   ) : (
                     <TextField defaultValue={userInfo.aboutUser}
                     onChange={e => { 
                        setValues({...values, aboutUser: e.target.value});
                      }} ></TextField>
                   )}
                </Grid>
                <Grid item padding= {2} xs = {12}>
                  <Typography variant="h4" style={{ fontWeight: 'bold' }}>Phone Number</Typography>
                  {editInfo === 0 ? (
                    <Typography variant="h4">{userInfo.phonenumber}</Typography>
                   ) : (
                     <TextField onChange = {e => setValues({...values, phonenumber: e.target.value})} defaultValue={userInfo.phonenumber}></TextField>
                   )}
                </Grid>
                <Grid item padding= {2} xs = {12}>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>Contact Email</Typography>
                  {editInfo === 0 ? (
                    <Typography variant="h4">{userInfo.emailContact}</Typography>
                   ) : (
                     <TextField onChange = {e => setValues({...values, emailContact: e.target.value})} defaultValue={userInfo.emailContact}></TextField>
                   )}
                </Grid>
              </Grid>
              {error && (
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
                    {error}
                  </Alert>
                  )}
              <Grid container justifyContent="center" sx={{ marginBottom: '1rem'}}>
                
                {editInfo === 1 ? (
                  <Button color="success" variant = "outlined" onClick = {saveData}>Save</Button>
                ) : (
                  <Button color="success" variant = "outlined" onClick={(e) => setEditInfo(1)}>Edit</Button>
                )}
              </Grid>
        </Grid>
    </Grid>
    </>
	);
};

export default About;
