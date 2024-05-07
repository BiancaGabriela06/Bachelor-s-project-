import React, {useState} from 'react'
import {Button, Drawer, Grid, TextField, Typography, Alert} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios'
import logo from ".././assets/images/logo.png"

const Feedback = () => {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("")
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleFeedback = () => {
    if(feedback ===''){
      setError("Before sending, please write a feedback")
      setMessage("")
    }
    else{
      axios.post('http://localhost:3001/ecovoyage/feedback', {feedback})
      .then(response => {
          if(response.data.Status === 'Success'){
                setError("");
                setMessage(response.data.Message);
          }
      })
    }
   
  }
  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={toggleDrawer}
        style={{
          position: 'fixed',
          bottom: '60px',
          right: '20px',
          zIndex: 999, // Ensure it's above other content
        }}
      >
        Give a feedback!
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        style={{ width: '1000px' }}
      >

      <Grid container justifyContent="center" padding={3}>
           <img alt="Eco Voyage" src={logo} style={{ width: '100px', height: 'auto', marginBottom: '1rem' }} />
      </Grid>
      
      <Grid container padding={3} justifyContent="center" style={{ marginTop: '10rem' }}>

        <Typography variant="h3" fontWeight="bold" color="#228B22" textAlign="center">
            Give us a Feedback!
        </Typography>

        <TextField
            multiline
            rows={5}
            value={feedback}
            fullWidth
            onChange={e => setFeedback(e.target.value)}
            required
            InputProps={{
              style: { fontSize: '1.5rem' } 
          }}
        />
        {message && (
            <Grid item xs={12}>
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                    {message}
                </Alert>
            </Grid>
        )}
        {error && (
            <Grid item xs={12}>
                <Alert severity="error">
                    {error}
                </Alert>
            </Grid>
        )}
        <Button variant="outlined" color="success" style={{ margin: '2rem', textAlign: 'center' }} onClick={handleFeedback}>
            Send
        </Button>
    </Grid>

      </Drawer>
    </>
  );
}

export default Feedback