import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Grid, Alert} from "@mui/material"
import Post from "./Post"

const FeedPosts = ({ selectedGroup }) => {
  var [posts, setUserPosts] = useState([]);
  var title = selectedGroup ? selectedGroup.title : null; // Initialize title with selectedGroup.title if selectedGroup exists

  useEffect(() => {
      const fetchData = async () => {
          try {
              const res = await axios.get('http://localhost:3001/posts/getposts');
              if (res.data.Status === 'Success') {
                  setUserPosts(res.data.Data);
              } else {
                  console.log(res.err);
              }
          } catch (error) {
              console.log(error);
          }
      };

      fetchData();
  }, [selectedGroup]);

  const filteredPosts = selectedGroup ? posts.filter(post => post.idgroup === selectedGroup.idgroup) : posts;

  return (
      <>
          <Grid container marginTop='3rem' justifyContent="center">
              {filteredPosts.map((post, index) => (
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
              ))}
              {filteredPosts.length === 0 && title && (
                  <Alert variant="outlined" severity="warning" style={{ fontSize: '2rem' }}>
                      There are no posts in {title}
                  </Alert>
              )}
          </Grid>
      </>
  );
};


export default FeedPosts;