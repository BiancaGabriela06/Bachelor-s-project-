import React, {useState, useEffect} from "react"
import {Grid, Typography, Card, Alert, CardContent, Button, Box, TextField} from "@mui/material"
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';

const Itinerary = ({itinerary}) => {
    const { title, location, start_date, end_date, notes, day_1, day_2, day_3, day_4, day_5, day_6, day_7 } = itinerary;
    const [message, setMessage] = useState("");
    const [editItinerary, setEditItinerary] = useState(0);
    const [days, setDays] = useState([]);
    const [tripNotes, setNotesPlan] = useState(notes);
    var [titleTrip, setTitleTrip] = useState(title);
    const [selectedDateFrom, setSelectedDateFrom] = useState(start_date);
    const [selectedDateTo, setSelectedDateTo] = useState(end_date);
    const [error, setError] = useState("");
    var [locationEdit, setLocation] = useState(location);
    var [savedTrip, setSavedTrip] = useState("");

    useEffect(() => {
        const daysArray = [day_1, day_2, day_3, day_4, day_5, day_6, day_7];
        const daysWithData = daysArray.filter(day => day !== null).map((day, index) => ({
            title: `Day ${index + 1}`,
            details: day
        }));
        setDays(daysWithData);
    }, [day_1, day_2, day_3, day_4, day_5, day_6, day_7]);

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
      const handleDateFrom = (e) => { setSelectedDateFrom(e.target.value)}
      const handleDateTo = (e) => {setSelectedDateTo(e.target.value)}

    const handleDelete = async () => {
        try {
            
           const response =  await axios.delete(`http://localhost:3001/itinerary/deleteitinerary/${itinerary.id}`);
           if(response.data.Status === "Success") {
                 setMessage("Itinerary deleted succesfully");
           }
            
        } catch (error) {
            console.error('Error deleting itinerary:', error);
        }

    }
    const handleEdit = () => {setEditItinerary(1);}

    const handleSaveChanges = () => {
        if(start_date === "")  setError("Please complete Start Date!");
        else if(end_date === "")  setError("Please complete End Date!");
        else{
            const tripPlan = {
                title_trip: titleTrip,
                notes: tripNotes,
                tripDays: days,
                start_date: selectedDateFrom,
                end_date: selectedDateTo,
                location: location
              }
              
              axios.put(`http://localhost:3001/itinerary/updateitinerary/${itinerary.id}`, tripPlan)
                .then(response => {
                  if (response.data.Status === 'Success') {
                    setError("");
                    setMessage("Info saved")
                  }
                })
                .catch(error => {
                  console.error("Error get possible itinerary:", error);
                });
             
        }    
      };

    return (
        <>
        
        {editItinerary === 0 ? (
        <div>
        <Card sx={{  padding: '5rem',  marginBottom: 5 , border: '2px solid #228B22', borderColor: '#228B22'}}>
            <CardContent>
                <Typography variant="h2" sx={{justifyContent: 'center', alignItems: 'center', textAlign: 'center',}} gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h3" sx={{marginBottom: '2rem'}} color="text.secondary" gutterBottom>
                    Location: {location}
                </Typography>
                <Typography variant="h3" color="text.secondary" sx={{marginBottom: '2rem'}} gutterBottom>
                    Start Date: {new Date(start_date).toLocaleDateString()} - End Date: {new Date(end_date).toLocaleDateString()}
                </Typography>
                <Typography variant="h3" gutterBottom> Notes: </Typography>
                <Typography variant="h3" gutterBottom sx={{ border: '1px solid #000', marginBottom: '2rem', padding: '0.5rem' }}>
                    {notes}
                </Typography>
                <Grid container spacing={2}>
                    {[day_1, day_2, day_3, day_4, day_5, day_6, day_7].map((day, index) => (
                        day && (
                            <Grid item xs={12} sx={{marginBottom: '2rem'}} key={index}>
                                <Typography variant="h3" gutterBottom>
                                    Day {index + 1}: {day}
                                </Typography>
                            </Grid>
                        )
                    ))}
                </Grid>
            </CardContent>
        </Card>
                {message && (
                    <Grid item xs={12} sx={{marginBottom: '2rem'}}>
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                            {message}
                        </Alert>
                    </Grid>
                )}
            <Button variant="contained" 
                onClick={handleDelete} 
                size = "large" 
                color="success"  
                sx={{ marginLeft: '20rem'}}
            >Delete Itinerary</Button>
            <Button variant="contained" 
                onClick={handleEdit} 
                size = "large" 
                color="success"  
                sx={{ marginLeft: '10rem'}}
            >Edit Itinerary</Button>
            </div>
        ) : (
            <div>
            <Box sx={{ width: 500, padding: '3rem'}}>
          <Typography variant="h3"  style={{ marginBottom: '2rem', textAlign: 'center'}}>TRIP ITINERARY</Typography>
          <TextField
              id="trip-plan"
              label="Trip Notes"
              value={titleTrip}
              onChange={handleTitleChange}
              variant="outlined"
              fullWidth
              style={{ marginBottom: '3rem' }}
            />
          <TextField
              id="trip-plan"
              label="Location"
              value={locationEdit}
              onChange={handleLocationChange}
              variant="outlined"
              fullWidth
              style={{ marginBottom: '3rem' }}
            />
          <Typography style={{ marginBottom: '0.5rem' }}>Start Date</Typography>
          <TextField type="date" style={{ marginBottom: '1.5rem' }} value={selectedDateFrom} variant="outlined" onChange={handleDateFrom} required/>
          <Typography style={{ marginBottom: '0.5rem' }}>End Date</Typography>
          <TextField type="date" style={{ marginBottom: '1.5rem' }} value={selectedDateTo} variant="outlined" onChange={handleDateTo} required/>
          <TextField
            id="trip-plan"
            label="Trip Plan"
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
        <Button onClick={handleSaveChanges} variant="contained" color="success">
          Save Changes
        </Button>
        {message && (
        <Grid item xs={12}>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            {message}
          </Alert>
        </Grid>
      )}
      {error && (
        <Grid item xs={12}>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
            {error}
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
            </div>
        )}


        
        
        </>
    )
}

export default Itinerary