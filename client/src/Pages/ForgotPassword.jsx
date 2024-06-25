import React, { useState } from "react";
import axios from 'axios'
import { Grid, Card, CardHeader, CardContent, Typography, TextField, Button, Link, Box } from '@mui/material';
import imageicon from "../assets/images/logo.png";
import {NavLink} from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("");
    const handleEmail = (e) => {setEmail(e.target.value)}

    const handleReset = (e) => {
      e.preventDefault();
      
      axios.post('http://localhost:3001/auth/forgetpassword', {email})
        .then(res => {
            if(res.data.Status === 'Success'){
                setMessage(res.data.Message);
            }
            if(res.data.Status === 'ErrorEmail'){
               setMessage(res.data.Message);
            }
            else{
                
                setError(res.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
    return (
      <Grid container justifyContent="center">
      <Card sx={{ width: 500, textAlign: 'center', marginTop: '3rem' }}>
        <CardHeader
          title="Password Reset"
          titleTypographyProps={{ variant: 'h3', color: 'white' }}
          sx={{ backgroundColor: '#228B22' }}
        />
        <CardContent>
        <Box component="img" 
          sx={{ marginTop: 5, height: 150, width: 150, 
            maxHeight: { xs: 200, md: 167 },
            maxWidth: { xs: 300, md: 250 },
          }} src={imageicon}/>
          <Typography variant="h5" sx={{ py: 2 }}>
            Enter your email address, and we'll send you an email with instructions to reset your password.
          </Typography>
          <form>
            {message && <Typography variant="h4" color="success.main">{message}</Typography>}
            {error && <Typography  variant="h4"  color="error.main">{error}</Typography>}
            <TextField
              fullWidth
              margin="normal"
              placeholder="Email address"
              type="email"
              variant="outlined"
              onChange={handleEmail}
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
            <Button
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3 }}
              onClick={handleReset}
            >
              Reset Password
            </Button>
          </form>
          <Box display="flex" justifyContent="space-between" mt={4}>
            <NavLink to ="/login" className="register" style={{textDecoration: "none"}}> Login</NavLink>
            <NavLink to ="/register" className="register"  style={{textDecoration: "none"}}>Register</NavLink>
          </Box>
        </CardContent>
      </Card>
    </Grid>

);
}

export default ForgotPassword;