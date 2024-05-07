import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Container, Grid, Typography} from "@mui/material"
import UserDetailsCard from './UserDetailsCard'

const Users = () => {

    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users/getusers');
            if (response.data.Status === 'Success') {
                setUsers(response.data.Data)
            } else {
            console.log(response.err);
            }
        } catch (error) {
            console.error(error);
        }
        };
  
        fetchData();
    }, []);

    return (
        <>
           <Container>
                <Typography variant="h4" gutterBottom textAlign="center">Users</Typography>
                <Grid container spacing={2}>
                    {users.map(user => (
                    <Grid item key={user.id} style={{width: '350px'}}>
                        <UserDetailsCard user={user} />
                    </Grid>
                    ))}
                </Grid>
                </Container>
        </>
    )

}

export default Users;