import React from "react"
import {Grid, Paper, Avatar, Typography} from "@mui/material"
import user1 from "../assets/images/user1.jpg"
import user2 from "../assets/images/user2.jpg"

const ReviewUsers = () => {
    return (
        <>

        <Grid style={{background: "linear-gradient(180deg, #8F9495, #eeeeee)"}}>
            <Grid item sx={{ height: "500px", justifyContent: "center", textAlign: "center" }}>
                  <Avatar src="user1"/>
                  <Typography variant="h5">George Popescu</Typography>
                  <Typography variant="h6">User from 22-02-2012</Typography>
            </Grid>
            <Grid item sx={{ height: "500px", justifyContent: "center", textAlign: "center" }}>
                   <Avatar src="user1"/>
                   <Typography variant="h5">Xio Mi</Typography>
                   <Typography variant="h6">User from 22-02-2018</Typography>
            </Grid>
            <Grid item>

            </Grid>
        </Grid>
        </>
    )
}

export default ReviewUsers;