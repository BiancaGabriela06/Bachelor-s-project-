import React, {useState} from "react";
import axios from "axios";
import videobackground from '../assets/videos/register-background.mp4'
import {Typography , Alert, Link, Box, CssBaseline, Container, Avatar, TextField, Grid, Button}from '@mui/material';
import imageicon from "../assets/images/logo.png";
import LoginIcon from '@mui/icons-material/Login';
import '../Styling/Login.css'

function Copyright(props) {
  return (
    <Typography sx = {{backgroundColor: 'white'} } variant="h4" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/home">
       EcoVoyage
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const Register = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [values, setValues] = useState({
      gmail: "",
      username: "",
      password: "",
  });

  const handleRegister = (event) => {
    event.preventDefault();
    setError("")
    axios.post('http://localhost:3001/auth/register', values)
    .then(res => {
        if(res.data.Status === 'Success'){
            setError("");
            setMessage(res.data.message);
        }
        else{
            setMessage("");
            setError(res.data.Error)
        }
    })
    .catch(err => console.log(err))
    
}

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <Box
          sx={{
            backgroundColor: 'white',
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          
        > 
          <Box component="img" 
          sx={{
            marginTop: 3,
            height: 150,
            width: 150,
            maxHeight: { xs: 200, md: 167 },
            maxWidth: { xs: 300, md: 250 },
          }}
          src={imageicon}/>
          <Avatar sx={{ m: 1, bgcolor: '#137639' }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Become a member of EcoVoyage!
          </Typography>
          {message && 
          (<Alert style={{marginTop: '2rem'}} severity="success">{message}</Alert>)
          }
          {error && (<Alert style={{marginTop: '2rem'}} severity="error">{error}</Alert>)}
          <Box component="form"  onSubmit={handleRegister} style={{padding: '10px'}}sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="gmail"
                  placeholder="Gmail"
                  name="gmail"
                  autoComplete="gmail"
                  onChange = {e => setValues({...values, gmail: e.target.value})}
                  sx={{
                    '& .MuiInputBase-input': {
                      padding: '16px', 
                      fontSize: '18px', 
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '18px', 
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  placeholder="Username"
                  name="username"
                  autoComplete="username"
                  onChange = {e => setValues({...values, username: e.target.value})}
                  sx={{
                    '& .MuiInputBase-input': {
                      padding: '16px', 
                      fontSize: '18px', 
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '18px', 
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange = {e => setValues({...values, password: e.target.value})}
                  sx={{
                    '& .MuiInputBase-input': {
                      padding: '16px', 
                      fontSize: '18px', 
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '18px', 
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontSize: '1rem'  }}
              style={{ backgroundColor: '#137639'}}
            >Register</Button>
            <Grid container justifyContent="flex-end">
              <Grid item >
              <Link href="/login" variant="h5" style={{textDecoration: "none", color: "inherit"}}>
                Do you have an account? Sign in
              </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <video autoPlay loop muted className="video">
                <source src={videobackground} type="video/mp4" />
        </video> 
      </Container>
);
}

export default Register;