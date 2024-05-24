import {React, useState, useEffect} from 'react';
import axios from 'axios';
import {Grid, Avatar,  Typography, Alert, Button, Box, Card, CardContent, CardActions, Select, MenuItem} from "@mui/material"
import Navbar from "../Navbar";
import Footer from "../Footer";
import AddItinerary from "./AddItinerary";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Itinerary from "./Itinerary"


const TripItineraries = () => {

    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
    const [datemember, setDateMember] = useState("");
    var [profileImage, setProfileImage] = useState();
    var [itineraries, setItineraries] = useState([]);
    var [showItineraries, setShowItineraries] = useState(1);
    var [showButtonAddItinerary, setButtonAdd] = useState(1);
    var [showButtonBack, setButtonBack] = useState(0);
    var [selectedItinerary, setSelectedItinerary] = useState("");
    var [showAddTrip, setAddTripBody] = useState(0);
    const [sortBy, setSortBy] = useState("");

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); 
      };

    useEffect(() => {
        const fetchData1 = async () => {
        try {
            const response = await axios.post('http://localhost:3001/image/user', { username });
            if (response.data.Status === 'Success') {
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
                    const response = await axios.get('http://localhost:3001/itinerary/getitineraries', {params: {
                        username: username,
                         }
                      });
                    if (response.data.Status === 'Success') {
                    setItineraries(response.data.Data);
                    if(response.data.Data.length ===0)
                        setShowItineraries(0);
                    } else {
                    console.log(response.err);
                    }
                } catch (error) {
                    console.error(error);
                }
                };
        
        fetchData3();
        fetchData2();
        fetchData1();
    }, []);

    const handleAddItinerary = () =>{
            setSelectedItinerary("")
            setShowItineraries(0);
            setAddTripBody(1);
            setButtonBack(1);
    }
    const handleButtonBack = () =>{
           setButtonAdd(1);
           setButtonBack(0);
           setAddTripBody(0);
           setShowItineraries(1);
    }

    const handleSeeMore = (itinerary) => {
        setButtonAdd(1);
        setShowItineraries(0);
        setSelectedItinerary(itinerary);
        setButtonBack(1);
    }

    const handleSort = (value) => {

        setSortBy(value);
        let sortedItineraries = [...itineraries];
        if (value === 'date_asc') {
            sortedItineraries.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
        } else if (value === 'date_desc') {
            sortedItineraries.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
        }

        setItineraries(sortedItineraries);
    };

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
                       <Typography variant="subtitle1">Member since 23-07-2023{datemember}</Typography>
                       <Button
                                color="success"
                                variant="contained"
                                sx={{
                                    marginTop: '2rem',
                                    marginBottom: '4rem',
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

                       
                  </Grid>
                  <Grid item row xs={8} style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', justifyContent: 'center', alignItems: 'center' }}>
                  {showButtonBack ? (
                        <Button variant="outlined" onClick={handleButtonBack} size = "large" color="success"   sx={{ marginLeft: '10rem'}}
                               >Back to Itineraries</Button>
                    ): (
                        <div></div>
                    )}
                    {showButtonAddItinerary ? (
                        <Button variant="outlined" 
                                size = "large"
                                onClick={handleAddItinerary} 
                                color="success"
                                sx={{ marginLeft: '10rem'}}
                                >Add Itinerary</Button>
                    ): (
                        <div></div>
                    )}
                    
                     <Box sx={{ padding: '5rem', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                 }}>
                    {
                        itineraries.length === 0 && showButtonBack === 0 &&  (
                            <Alert variant="outlined" severity="warning" style={{ fontSize: '2rem' }}>
                                There are no saved itineraries. 
                            </Alert>
                        )
                    }
                    {showItineraries ? (
                            <>
                            <Select
                                value={sortBy}
                                onChange={(e) => handleSort(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Sort By' }}
                                sx={{ marginLeft: '10rem', marginBottom: '3rem', marginTop: '2rem' }}
                            >
                                <MenuItem value="" disabled>
                                    Sort By
                                </MenuItem>
                                <MenuItem value="date_asc">Date - Ascending</MenuItem>
                                <MenuItem value="date_desc">Date - Descending</MenuItem>
                            </Select>

                            {itineraries.map((itinerary, index) => (
                                <Card key={index} sx={{
                                    marginBottom: '3rem',
                                    marginLeft: '10rem',
                                    width: '50rem',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    border: '2px solid #228B22',
                                    borderColor: '#228B22'
                                }}>
                                    <CardContent>
                                        <Typography variant="h3" gutterBottom>
                                            Trip {index + 1}: {itinerary.title}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} variant="h4" gutterBottom fontWeight="bold">
                                            Date: {formatDate(itinerary.start_date)} - {formatDate(itinerary.end_date)}
                                        </Typography>
                                        <Typography variant="h4" component="div">
                                            {itinerary.notes.substring(0, 40)}...
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        <Button size="large" onClick={() => handleSeeMore(itinerary)} color="success">See more<ArrowForwardIcon /></Button>
                                    </CardActions>
                                </Card>
                            ))}
                        </>
                    ) : (
                        selectedItinerary !== "" && <Itinerary itinerary={selectedItinerary} />
                    )}

                       {showAddTrip ? (
                           <AddItinerary/>
                            ): (
                                <div></div>
                         )}

                   </Box>       
                  </Grid>     
            </Grid>
            <Footer/>
        </>
    )
}

export default TripItineraries;