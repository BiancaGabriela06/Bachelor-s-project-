import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import {Button, Avatar, Menu, MenuItem} from "@mui/material"


const Accesibility = () => {

    var [profileImage, setProfileImage] = useState();

    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
    const [admin, setAdmin] = useState(0);
    const navigate = useNavigate();
    var token = localStorage.getItem("token");

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleProfile = () => {
        setAnchorEl(null);
        navigate(`/profile/`+token)
      };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setAnchorEl(null);
        navigate("/login")
      };
    
    const handleDashboard = () => {
      setAnchorEl(null);
      navigate(`/dashboard/` + token)
    }
      const handleClose = () => {
        setAnchorEl(null);
      };

      useEffect(() => {
        const fetchData1 = async () => {
          try {
            const response = await axios.post('http://localhost:3001/image/user', { username });
            if (response.data.Status === 'Success') {
              console.log("Navbar photo " + response.data.Data)
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
            const response =  await axios.get('http://localhost:3001/users/isAdmin', {params: {
              username: username,
               }
            });
              if (response.data.Status === 'isAdmin') {
                  setAdmin(1);
              }
              else if(response.data.Status === 'noAdmin'){
                  setAdmin(0);
              }
               else {
                  console.log(response.data.err);
              }
          } catch (error) {
              console.error(error);
          }
      };
          fetchData2();
      }, []);

    return (
        <>
             <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{color: 'white', fontSize: '10px', marginRight: '3rem',
              '&:focus': {
                outline: 'none',
              },
              '&:active': {
                boxShadow: 'none',
              }}}
            >
            <Avatar sx={{marginRight: '1rem'}} src={`http://localhost:3001/profileimages/` + profileImage} alt="Profile Image"/>  {username}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              {admin && (
                  <MenuItem onClick={handleDashboard}>Dashboard</MenuItem> 
               )}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    )
}



export default Accesibility;