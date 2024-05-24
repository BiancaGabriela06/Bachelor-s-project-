import React, {useState} from 'react'
import axios from "axios"
import imageicon from "../assets/images/logo.png";
import "../Styling/ChangePassword.css"
import { useNavigate } from 'react-router-dom'
import { Container, Grid, Card, CardHeader, CardContent, CardActions, Typography, TextField, Button, Box, IconButton, InputAdornment } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import SaveIcon from '@mui/icons-material/Save';

const ChangePassword = () => {
    const [values, setValues] = useState({
        newpassword: "",
        confirmpassword: ""
    })

    const [error, setError] = useState("")

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
      
        axios.post('http://localhost:3001/auth/changepassword', values)
          .then(res => {
              if(res.data.Status === 'Success'){
                  navigate("/login");
              }
              else{
                  
                  setError(res.data.Error)
              }
          })
          .catch(err => console.log(err))
    }
     return (
    <Container>
      <Grid container justifyContent="center" marginTop="10rem">
        <Grid item xs={12} sm={12} md={6}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h3" component="div">  <LockIcon fontSize='4rem'/> Change password </Typography>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                <Box component="img" 
                    sx={{ marginTop: 5, marginLeft: 6, height: 150, width: 150, 
                        maxHeight: { xs: 200, md: 167 },
                        maxWidth: { xs: 300, md: 250 },
                    }} src={imageicon}/>
                </Grid>
                <Grid item xs={6}>
                  {error && <Typography color="error">{error}</Typography>}
                  <TextField
                    fullWidth
                    margin="normal"
                    placeholder="New Password"
                    type="password"
                    onChange={e => setValues({ ...values, newpassword: e.target.value })}
                    sx={{
                        '& .MuiInputBase-input': {
                          padding: '16px', 
                          fontSize: '18px', 
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: '18px', 
                        },
                      }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    placeholder="Confirm Password"
                    type="password"
                    onChange={e => setValues({ ...values, confirmpassword: e.target.value })}
                    sx={{
                        '& .MuiInputBase-input': {
                          padding: '16px', 
                          fontSize: '18px', 
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: '18px', 
                        },
                      }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LoginIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button
                    variant="contained"
                    color="success"
                    sx = {{ fontSize: '1.5rem', marginRight: '10rem'}}
                    startIcon={<SaveIcon />}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
	);
}

export default ChangePassword