import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Link, useNavigate } from "react-router-dom";
import {Button, Avatar} from "@mui/material"

const AccesibilityContainer = styled.div`
    display: flex;

`
const Accesibility = () => {

    var [profileImage, setProfileImage] = useState();

    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("currentUser");
        navigate("/home");
      };

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
    return (
        <AccesibilityContainer>
            <Button sx={{color: 'white'}}>
            <Avatar src={`http://localhost:3001/profileimages/` + profileImage} alt="Profile Image"/>
            <Button sx={{color: 'white', fontSize: '10px'}} href = "/profile2">
            {username}
                </Button></Button>
            <Button  sx={{color: 'white', fontSize: '10px'}} onClick={logout} className="btn">Logout</Button>
        </AccesibilityContainer>
    )
}



export default Accesibility;