import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Card, CardContent, Typography, Grid } from '@mui/material';

const UserDetailsCard = ({ user }) => {
  const navigate = useNavigate();
  var token = localStorage.getItem("token");
  const handleNameClick = () => {
    navigate(`/users/${user.username}/${token}`)
  };
  

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar alt={user.username} src={`http://localhost:3001/profileimages/` + user.profileImage} />
          </Grid>
          <Grid item>
            <Typography variant="h5" fontWeight="bold" onClick={handleNameClick} style={{ cursor: 'pointer' }}>
              {user.username}
            </Typography>
          </Grid>
        </Grid>
        <Typography style={{marginTop: '1rem'}} variant="h6">Date Membership: {user.datamembership}</Typography>
        <Typography variant="h6">About User: {user.aboutUser}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserDetailsCard;
