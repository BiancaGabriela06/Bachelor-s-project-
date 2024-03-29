import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import {TextField, Alert, Link, Grid, Box, Container, Button, Avatar, Typography} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import imageicon from "../assets/images/logo.png";
import videobackground from '../assets/videos/login-background.mp4'
import '../Styling/Login.css'

function Copyright(props) {
  return (
    <Typography sx = {{backgroundColor: 'white'}}variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/home">
       EcoVoyage
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const Login = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("")
    const [error, setError] = useState("");
    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    const handleLogin = (event) => {
        event.preventDefault();
        setMessage("")
        console.log(values);
        axios.post('http://localhost:3001/auth/login', values)
        .then(res => {
            if(res.data.Status === 'Success' && res.data.Login === true){
                localStorage.setItem('currentUser', JSON.stringify(res.data.Data.username));
                const token = res.data.Token;
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                localStorage.setItem('token', token);
                console.log(token);
                navigate("/home");
            }
            else if(res.data.Status === 'Error'){
               setError(res.data.Error);
            }
        })
        .catch(err => console.log(err))
        
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <Box
          sx={{
            backgroundColor: 'white',
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          
        > 
          <Box component="img" 
          sx={{
            marginTop: 5,
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
            Welcome Back!
          </Typography>
          {message && 
          (<Alert severity="success">{message}</Alert>)
          }
          {error && (<Alert severity="error">{error}</Alert>)}
          <Box component="form"  onSubmit={handleLogin} style={{padding: '10px'}}sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username/Gmail"
                  name="username"
                  autoComplete="username"
                  onChange = {e => setValues({...values, username: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange = {e => setValues({...values, password: e.target.value})}
                />
              </Grid>
            </Grid>
            <Grid item >
                <Link href="/forgotpassword" variant="body2">
                  Forget password?
                </Link>
              </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: '#137639'}}
            >
              Sign IN
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item >
                <Link href="/register" variant="body2">
                  Don't have an account? Register
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
    </ThemeProvider>
  );
}

export default Login;