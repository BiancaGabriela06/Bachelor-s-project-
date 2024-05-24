import React, { useEffect, useState} from 'react';
import { Box, Button, TextField, Typography, Grid, Alert } from '@mui/material';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';

const Days = () => {
  const [days, setDays] = useState([]);
  const [tripNotes, setNotesPlan] = useState('');
  var [titleTrip, setTitleTrip] = useState("");
  const [selectedDateFrom, setSelectedDateFrom] = useState("");
  const [selectedDateTo, setSelectedDateTo] = useState("");
  var [location, setLocation] = useState("");
  var [message, setMessage] = useState("");
  var [savedTrip, setSavedTrip] = useState("");
  var [idUser, setIdUser] = useState(0);
  var currentUser = localStorage.getItem("currentUser");
  const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));

  const handleAddDay = () => {
    const newDay = {
      title: `Day ${days.length + 1}`,
      details: ''
    };
    setDays([...days, newDay]);
  };

  const handleTripPlanChange = (e) => {setNotesPlan(e.target.value);};
  const handleLocationChange = (e) => {setLocation(e.target.value)};

  const handleTitleChange = (e) => {setTitleTrip(e.target.value) }
  const handleDateFrom = (e) => {setSelectedDateFrom(e.target.value)}
  const handleDateTo = (e) => {setSelectedDateTo(e.target.value)}
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get(`http://localhost:3001/users/getuserid`, {
          params: {
            username: username 
          }
      })
        console.log(response.data)
         if(response.data.Status === 'Success'){
          console.log(response.data.Data)
          setIdUser(response.data.Data);
         }

      }catch(error){
        console.log(error);
      }
    }
    
    fetchData();
    
  }, [])

  const handleSaveItinerary = () => {
    
    const tripPlan = {
      title_trip: titleTrip,
      notes: tripNotes,
      tripDays: days,
      start_date: selectedDateFrom,
      end_date: selectedDateTo,
      location: location,
      iduser: idUser

    }
    
    axios.post(`http://localhost:3001/itinerary/insertitinerary`, tripPlan)
      .then(response => {
        if (response.data.Status === 'Success') {
          localStorage.setItem('idPossibleItinerary', response.data.IdPossibleItinerary);
          setDays([]);
          setNotesPlan("");
          setLocation("");
          setTitleTrip("");
          setSelectedDateFrom("");
          setSelectedDateTo("");
          setSavedTrip("Itinerary saved successfully. Check your Profile Page.")
        }
      })
      .catch(error => {
        console.error("Error get possible itinerary:", error);
      });
    
  };

  return (
    <>
      <Box sx={{ width: 500, padding: '3rem'}}>
          <Typography variant="h3"  style={{ marginBottom: '2rem', textAlign: 'center'}}>TRIP ITINERARY</Typography>
          <TextField
              id="trip-plan"
              label="Title"
              value={titleTrip}
              onChange={handleTitleChange}
              variant="outlined"
              fullWidth
              style={{ marginBottom: '3rem' }}
            />
          <TextField
              id="trip-plan"
              label="Location"
              value={location}
              onChange={handleLocationChange}
              variant="outlined"
              fullWidth
              style={{ marginBottom: '3rem' }}
            />
          <Typography style={{ marginBottom: '0.5rem' }}>Start Date</Typography>
          <TextField type="date" style={{ marginBottom: '1.5rem' }} value={selectedDateFrom} variant="outlined" onChange={handleDateFrom} />
          <Typography style={{ marginBottom: '0.5rem' }}>End Date</Typography>
          <TextField type="date" style={{ marginBottom: '1.5rem' }} value={selectedDateTo} variant="outlined" onChange={handleDateTo} />
          <TextField
            id="trip-plan"
            label="Trip Notes"
            multiline
            rows={4}
            value={tripNotes}
            onChange={handleTripPlanChange}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '3rem' }}
          />
          <Button onClick={handleAddDay} variant="contained" color="primary" style={{ marginBottom: '10rem' }}>
            Add Day
          </Button>
        {/* Render days */}
        {days.map((day, dayIndex) => (
          <div key={dayIndex}>
            <h2>{day.title}</h2>
            <TextField
              label="Details"
              multiline
              rows={2}
              value={day.details}
              onChange={(e) => {
                const newDays = [...days];
                newDays[dayIndex].details = e.target.value;
                setDays(newDays);
              }}
              variant="outlined"
              fullWidth
              style={{ marginBottom: '3rem' }}
            />
          </div>
        ))}
        <Button onClick={handleSaveItinerary} style={{marginLeft: '9rem'}} variant="contained" color="success">
          Save Itinerary
        </Button>
        {message && (
        <Grid item xs={12}>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Initerary saved successfully
          </Alert>
        </Grid>
      )}
      {savedTrip && (
        <Grid item xs={12}>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            {savedTrip}
          </Alert>
        </Grid>
      )}
      </Box>
    </>
  );
}

export default Days;
