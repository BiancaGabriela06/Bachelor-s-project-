import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Grid, Alert } from '@mui/material';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';

const Days = () => {
  const [days, setDays] = useState([]);
  const [tripNotes, setNotesPlan] = useState('');
  var [titleTrip, setTitleTrip] = useState("");
  var idPossibleItinerary = localStorage.getItem('idPossibleItinerary');
  const [selectedDateFrom, setSelectedDateFrom] = useState("");
  const [selectedDateTo, setSelectedDateTo] = useState("");
  var [location, setLocation] = useState("");
  var [message, setMessage] = useState("");
  var [savedTrip, setSavedTrip] = useState("");
  var [idUser, setIdUser] = useState(0);

  useEffect(() => {
    
    axios.get('http://localhost:3001/itinerary/possibleitinerary', { params: { idPossibleItinerary: idPossibleItinerary } })
      .then(response => {
        if (response.data.Status === 'Success') {
          const data = response.data.Data;
          const dayKeysWithData = Object.keys(data).filter(key => /^day_\d+$/.test(key) && data[key] !== null);
          const daysWithData = dayKeysWithData.map(dayKey => ({
            title: `Day ${parseInt(dayKey.split('_')[1])}`,
            details: data[dayKey]
          }));
          setDays(daysWithData);
          setNotesPlan(data.notes);
          setLocation(data.location);
          setTitleTrip(data.title);
          setSelectedDateFrom(data.start_date);
          setSelectedDateTo(data.end_date);
          setIdUser(data.iduser);
        }
      })
      .catch(error => {
        console.error("Error get possible itinerary:", error);
      });
  }, []);

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

  const handleSaveInfo = () => {
    const tripPlan = {
      title_trip: titleTrip,
      notes: tripNotes,
      tripDays: days,
      start_date: selectedDateFrom,
      end_date: selectedDateTo,
      location: location
    }
    
    axios.put(`http://localhost:3001/itinerary/updatepossibleitinerary/${idPossibleItinerary}`, tripPlan)
      .then(response => {
        if (response.data.Status === 'Success') {
          setMessage("Info saved")
        }
      })
      .catch(error => {
        console.error("Error get possible itinerary:", error);
      });
   
  };

  const handleSaveItinerary = () => {
    console.log("Itinerary saved:");
    console.log(days); 
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
              label="Trip Title"
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
        <Button onClick={handleSaveInfo} style={{marginLeft: '6rem', marginRight: '1rem'}} variant="contained" color="secondary">
          Keep info
        </Button>
        <Button onClick={handleSaveItinerary} variant="contained" color="success">
          Save Itinerary
        </Button>
        {message && (
        <Grid item xs={12}>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            {message}
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
