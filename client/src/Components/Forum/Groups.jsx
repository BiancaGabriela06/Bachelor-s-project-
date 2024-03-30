import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Alert, Typography, Paper, Button, Grid, Chip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

const Groups = () => {
    const [groups, setGroups] = useState([]);
    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState(0);
    const [lastJoinedGroup, setLastJoinedGroup] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/dashboard/groups', {params: { username: username}})
            .then(response => {
                if(response.data.Status === 'Success')
                setGroups(response.data.Data);
            })
            .catch(error => {
                console.error("Error fetching groups:", error);
            });
    }, []);

    const handleJoinGroup = (groupid) => {
        const values = {
            groupid: groupid,
            username: username
        }
        axios.post('http://localhost:3001/dashboard/groups/join', values)
        .then(response => {
            if(response.data.Status === 'Success'){
                setMessage(response.data.Message);
                setSuccess(1);
                setLastJoinedGroup(groupid);
            }
             
        })
        .catch(error => {
            console.error("Error fetching groups:", error);
        });

    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Grupuri</Typography>
            {groups.map(group => (
                <Paper key={group.id} elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
                    {group.isMember ? (<Grid item xs={12}>
                    <Alert severity="success" >Member</Alert> </Grid>) : (
                      <Grid/>
                   )}
                    <Typography variant="h5">{group.title}</Typography>
                    <Typography variant="body1" style={{ marginBottom: "10px" }}>{group.description}</Typography>
                    <Typography variant="body2" gutterBottom>Atribute:</Typography>
                    <Grid container spacing={1} style={{ marginBottom: "10px" }}>
                        {group.attributes.map((attribute, index) => (
                            <Grid item key={index}>
                                <Chip label={attribute} />
                            </Grid>
                        ))}
                    </Grid>
                    <Typography variant="body2" gutterBottom>Membrii în grup: {group.member_count}</Typography>
                    {group.isMember ? (<Grid/>) : (
                         <Button variant="contained" color="primary" onClick={() => handleJoinGroup(group.idgroup)}><AddIcon/></Button>
                   )}
                    
                    {success && lastJoinedGroup === group.idgroup ? (
                        <Grid item xs={12}>
                            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">{message}</Alert>
                        </Grid>
                    ) : (<Grid/>)}
                </Paper>
            ))}
        </Container>
    );
};

export default Groups;
