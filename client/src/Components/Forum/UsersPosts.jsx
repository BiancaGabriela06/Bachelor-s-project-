import React, {useEffect, useState} from 'react'
import {Grid, Typography, Card, CardContent, CardHeader, Avatar,} from "@mui/material"
import axios from 'axios'

const ForumPosts = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/posts/getposts')
            .then(response => {
                if(response.data.Status === 'Success')
                setPosts(response.data.Data);
            })
            .catch(error => {
                console.error("Error fetching groups:", error);
            });
    }, []);

    return (
    <>
      <Grid container spacing={2} justifyContent="center">
            {posts.map(post => (
                <Grid item key={post.postid} xs={12} md={6}>
                    <Card sx={{ maxWidth: 600 }}>
                        <CardHeader
                            avatar={<Avatar src={`http://localhost:3001/profileimages/` + post.profileImage}/> }
                            title={post.title}
                            subheader={new Date(post.date).toLocaleString()}
                        />
                        <CardContent>
                            <Typography variant="body1" gutterBottom>
                                {post.description}
                            </Typography>
                            <Typography variant="body2">
                                 {post.location}
                            </Typography>
                            <Typography variant="body2">
                                Likes: {post.likes}
                            </Typography>
                            <Typography variant="body2">
                                Comments: {post.comments}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </>)
}

export default ForumPosts;