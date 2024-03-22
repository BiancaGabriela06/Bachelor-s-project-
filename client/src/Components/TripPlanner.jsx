import {React, useState, useEffect} from 'react'
import {Grid, Button, Avatar} from '@mui/material';
import AddTravelIntinerary from "../Components/AddTravelIntinerary"
import TravelIntineraries from './TravelIntineraries';
import Navbar from "../Components/Navbar"
import axios from "axios"
import {Row, Col, Container} from "react-bootstrap"
import Footer from "../Components/Footer"

const TripPlanner = () => {
    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
    const [showAddIntinerary, setShowAddIntinenary] = useState(0);
    var [profileImage, setProfileImage] = useState();

    const AddIntinerary = (e) => {
        e.preventDefault();
        setShowAddIntinenary(1);
    }

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
        <>
        <Navbar/>
            <div className='container-sm'>
                <Row>

                </Row>
                <Col sm ={4} xs={4} justifyContent="left" columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                   style={{ backgroundColor: '#E2F1E1', padding: '16px' }}>
                    {/* 
                    Icon Profile
                    How many trips did you have / plan
                    favourite destinations
                    buton adauga travel intinerary
                    */}
                    <Row>
                        <Button variant="text" href="/profile">
                            <Avatar alt="userimage" src={`http://localhost:3001/profileimages/` + profileImage}/>{username}</Button> 
                    </Row> 
                    <Row>
                        <Button variant="text" onClick={AddIntinerary}>Add a new travel intinerary</Button>
                    </Row> 
                    
            
                </Col>
               
            { showAddIntinerary ?
                (
                
                    <Col sm={8} justifyContent="right"  style={{ backgroundColor: '#DEF5F1', padding: '16px' }}>
                        <AddTravelIntinerary/>
                    </Col>
                
                ) 
                : (
                    
                    <Col sm={8} justifyContent="right"  style={{ backgroundColor: '#DEF5F1', padding: '16px' }}>
                         <TravelIntineraries/>
                    </Col>
                    
                    )
            }
            
        </div>
        
        <Footer/>
        </>
     )
}

export default TripPlanner;