import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Alert, Typography, Paper, Button, Grid, Chip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const Groups = ({onSelect}) => {
    const [groups, setGroups] = useState([]);
    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState(0);
    const [lastJoinedGroup, setLastJoinedGroup] = useState(null);
    
    const handleClick = (group) => {
        onSelect(group);
    };

    useEffect(() => {
        axios.get('http://localhost:3001/groups/groups', {params: { username: username}})
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
        axios.post('http://localhost:3001/groups/join', values)
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
            <Typography variant="h4" gutterBottom textAlign="center">Groups</Typography>
            {groups.map(group => (
                <Paper key={group.id} elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item xs={8}>
                        <Button onClick={() => handleClick(group)} style={{ textAlign: 'center', fontSize: '1.5rem' }} variant="h4">
                            {group.title}
                        </Button>
                    </Grid>
                    {group.isMember && (
                        <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
                            <CheckBoxIcon style={{ color: '#228B22', marginRight: '5px' }} />
                            <Typography style={{ color: "#228B22" }}>Member</Typography>
                        </Grid>
                    )}
                </Grid>
                <Typography variant="h6" style={{ marginBottom: "10px" }}>{group.description}</Typography>
                <Typography variant="body2" gutterBottom>Atribute:</Typography>
                <Grid container spacing={1} style={{ marginBottom: "10px" }}>
                    {group.attributes.map((attribute, index) => (
                        <Grid item key={index}>
                            <Chip label={attribute} />
                        </Grid>
                    ))}
                </Grid>
                <Typography variant="body2" gutterBottom>Members: {group.member_count}</Typography>
                {group.isMember ? <Grid /> : (
                    <Button variant="contained" color="primary" onClick={() => handleJoinGroup(group.idgroup)}>
                        <AddIcon />
                    </Button>
                )}
                {success && lastJoinedGroup === group.idgroup ? (
                    <Grid item xs={12}>
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">{message}</Alert>
                    </Grid>
                ) : <Grid />}
            </Paper>
            
            ))}
        </Container>
    );
};

export default Groups;
