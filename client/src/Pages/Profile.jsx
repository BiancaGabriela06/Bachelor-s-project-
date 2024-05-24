import {React, useState, useEffect} from 'react';
import axios from 'axios';
import {Grid, Avatar,  Typography, Button, Box, Tab, Tabs } from "@mui/material"
import Navbar from "../Components/Navbar"
import Footer from '../Components/Footer';
import Timeline from '../Components/UserPage/Timeline';
import PropTypes from 'prop-types';
import About from "../Components/UserProfile/AboutProfile"
import Gallery from "../Components/UserProfile/GalleryProfile"
import NotificationProfile from "../Components/Itinerary/NotificationProfile"
import moment from 'moment'; 

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


const Profile = () => {

    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
    const [datemember, setDateMember] = useState("");
    var [profileImage, setProfileImage] = useState();
    const [value, setValue] = useState(0);
    const [nextTrip, setNextTrip] = useState("");

    const handleCloseNotification = () => {
      setNextTrip(null);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

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
                const response = await axios.get('http://localhost:3001/users/userinfo', {params: {
                  username: username,
                   }
                })
                if (response.data.Status === 'Success') {
                  const formattedDate = moment(response.data.data.datamembership).format('MMMM Do YYYY');
                  setDateMember(formattedDate);
                } else {
                console.log(response.err);
                }
            } catch (error) {
                console.error(error);
            }
            };
          const fetchData3 = async () => {
              try {
                  const response = await axios.get('http://localhost:3001/itinerary/soonesttrip');
                  if (response.data.Status === 'Success') {
                      setNextTrip(response.data.Data);
                  } else {
                      console.log(response.data.err);
                  }
              } catch (error) {
                  console.log(error);
              }}
  
        fetchData3();
        fetchData2();
        fetchData1();
    }, []);


    return (
        <>
            <div>
                <Navbar/>
            </div>
            
            <Grid container  style={{ padding: '100px' }} spacing={1}>
                  <Grid item xs={4} align="center" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <Avatar src={`http://localhost:3001/profileimages/` + profileImage} 
                  alt="Profile Image"
                  style={{ width: '10rem', height: '10rem', marginBottom: '3rem' }}
                  />

                       <Typography variant="h3" >{username}</Typography>
                       <Typography fontWeight="bold" variant="subtitle1">Member since {datemember}</Typography>
                       <Button
                          color="success"
                          variant="contained"
                          sx={{
                            marginTop: '2rem',
                            '&:hover': {
                              backgroundColor: 'inherit',
                              color: 'inherit',
                              textDecoration: 'none'
                            }
                          }}
                          href={`/profile/${username}/tripitineraries`}
                        >
                          Trip itineraries
                        </Button>

                       {nextTrip && <NotificationProfile itinerary={nextTrip} onClose={handleCloseNotification} />}
                  </Grid>
                  <Grid item row xs={8} style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between' }}>
                  <Box sx={{ padding: '100px', width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} justifyContent="space-between" sx={{padding: '10px', margin: '10px'}} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Timeline" sx={{ color: '#228B22', fontSize: '2rem' }} {...a11yProps(0)} />
                                <Tab label="About"  sx={{ color: '#228B22', fontSize: '2rem' }} {...a11yProps(1)} />
                                <Tab label="Gallery"  sx={{ color: '#228B22', fontSize: '2rem' }} {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <Timeline username={username}/>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <About/>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <Gallery/>
                        </CustomTabPanel>
                   </Box>       
                  </Grid>     
            </Grid>
            <Footer/>
        </>
    )
}

export default Profile;