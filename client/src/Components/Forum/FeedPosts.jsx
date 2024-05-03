import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Grid} from "@mui/material"
import Post from "./Post"

const FeedPosts = ({selectedGroup}) => {
    var [posts, setUserPosts] = useState([])

    useEffect(() => { 
      const fetchData = async() => {
        try{
          const res = await axios.get('http://localhost:3001/posts/getposts');
            if(res.data.Status === 'Success')
            {
                setUserPosts(res.data.Data);
                console.log(posts);
            }
            else {
                console.log(res.err);
            }
          
        }catch(error){
          console.log(error);
        }
      }

      console.log(selectedGroup);
      fetchData();
    }, []);
    
    const filteredPosts = selectedGroup ? posts.filter(post => post.idgroup === selectedGroup.idgroup) : posts;
    
    
    return (
      <>
        <Grid container justifyContent="center">
        {filteredPosts.map((post, index) => (
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

export default FeedPosts;