import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Navbar from "../Components/Navbar"
import {Grid, Avatar, Typography, Button, Box, Tab, Tabs} from "@mui/material"
import Footer from '../Components/Footer';
import Groups from '../Components/UserPage/GroupsUser';
import PropTypes from 'prop-types';
import AboutUser from "../Components/UserPage/AboutUser"
import Gallery from "../Components/UserPage/Gallery"
import Timeline from "../Components/UserPage/Timeline"

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

const UserPage = () => {

    const { username } = useParams();
    const [dataUser, setDataUser] = useState([]);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =  await axios.get('http://localhost:3001/users/getuser', {params: {
                  username: username,
                   }
                });
                  if (response.data.Status === 'Success') {
                      setDataUser(response.data.Data);
                  }
                   else {
                      console.log(response.data.err);
                  }
              } catch (error) {
                  console.error(error);
              }
        }

        fetchData();
    }, [])

    return (
        <>
        <div>
            <Navbar/>
        </div>
        
        <Grid container  style={{ padding: '100px' }} spacing={1}>
              <Grid item xs={4} align="center" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <Avatar src={`http://localhost:3001/profileimages/` + dataUser.profileImage} 
              alt="Profile Image"
              style={{ width: '10rem', height: '10rem', marginBottom: '3rem' }}
              />

                   <Typography variant="h3" >{dataUser.username}</Typography>
                   <Typography variant="subtitle1">Member since {dataUser.datamembership}</Typography>
                   <Groups username={username}/>
                   
              </Grid>
              <Grid item row xs={8} style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between' }}>

            <Box sx={{ padding: '100px', width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} justifyContent="space-between" sx={{padding: '10px', margin: '10px'}} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Timeline" sx={{ color: '#228B22', fontSize: '13px' }} {...a11yProps(0)} />
                        <Tab label="About"  sx={{ color: '#228B22', fontSize: '13px' }} {...a11yProps(1)} />
                        <Tab label="Gallery"  sx={{ color: '#228B22', fontSize: '13px' }} {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Timeline username={username}/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <AboutUser profileImage={dataUser.profileImage} aboutUser={dataUser.aboutUser}
                    phonenumber={dataUser.phonenumber} emailContact={dataUser.emailContact}/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <Gallery username={username}/>
                </CustomTabPanel>
                </Box>
                
                      
              </Grid>
             
        </Grid>
        <Footer/>
    </>
    )
}

export default UserPage;