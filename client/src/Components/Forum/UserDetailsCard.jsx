import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Card, CardContent, Typography, Grid } from '@mui/material';

const UserDetailsCard = ({ user }) => {
  const navigate = useNavigate();
  const handleNameClick = () => {
    navigate(`/users/${user.username}`)
    console.log(`Navigating to ${user.username}'s profile`);
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar alt={user.username} src={`http://localhost:3001/profileimages/` + user.profileImage} />
          </Grid>
          <Grid item>
            <Typography variant="h6" onClick={handleNameClick} style={{ cursor: 'pointer' }}>
              {user.username}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body1">Date Membership: {user.datamembership}</Typography>
        <Typography variant="body2">About User: {user.aboutUser}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserDetailsCard;
