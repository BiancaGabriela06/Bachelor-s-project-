import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Grid, Alert} from "@mui/material"
import Post from "../Forum/Post"

const Timeline = (username) => {
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => { 
        const fetchData = async() => {
          try{
            const res = await axios.get('http://localhost:3001/posts/userposts', {params: {username: username}});
              if(res.data.Status === 'Success'){
                  setUserPosts(res.data.Data);
              }
              else {
                  console.log(res.err);
              }
            
          }catch(error){
            console.log(error);
          }
        }
  
        fetchData();
      }, []);
    return (
        <>
         <Grid container justifyContent="center">
         {userPosts.length === 0 ? (
        <Alert severity="info" sx={{fontSize: '3rem'}}>No posts found.</Alert>
      ) : (
        userPosts.map((post, index) => (
          <Post
            key={index}
            postid={post.postid}
            user={post.username}
            likes={post.likes}
            profileImage={post.profileImage}
            postData={post.date}
            description={post.description}
            location={post.location}
            group={post.title}
            photo={post.image}
          />
        ))
      )}
        </Grid>
        </>
    )
}

export default Timeline;