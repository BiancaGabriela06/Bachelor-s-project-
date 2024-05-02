import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Grid} from "@mui/material"
import Post from "./Post"

const UserPostsProfile = () => {
    var [userPosts, setUserPosts] = useState([])

    useEffect(() => { 
      const fetchData = async() => {
        try{
          const res = await axios.get('http://localhost:3001/posts/getposts');
            if(res.data.Status === 'Success')
            {
                setUserPosts(res.data.Data);
                console.log(userPosts);
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
        {userPosts.map((post, index) => (
              <Post
                  postid={post.postid}
                  user={post.username}
                  likes = {post.likes}
                  profileImage={post.profileImage}
                  postData={post.date}
                  description={post.description}
                  location={post.location}
                  group={post.title}
                  photo={post.image}
              />
          ))}
        </Grid>
      </>
    );
}

export default UserPostsProfile;