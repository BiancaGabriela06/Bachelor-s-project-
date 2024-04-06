import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Grid, Avatar, CardHeader, Card, Skeleton, IconButton,
         CardMedia, CardContent, Typography, Button, TextField, Tooltip} from "@mui/material"
import Post from "./Post"

const UserPostsProfile = () => {
    var [profileImage, setProfileImage] = useState();
    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
    var [userPosts, setUserPosts] = useState([])
    var [commentsBool, setShowComments] = useState(1);
    var [idpost, setidPost] = useState("")
    var [commentsPost, setCommentsPost] = useState([]);
    var [comment, setComment] = useState({
      username: username,
      text: "",
      postid: ""
    })

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

    const increaseLikes = async (postid) => {
      try {
        const response = await axios.post('http://localhost:3001/posts/increaselikes', {postid});
    
        if (response.data.Status === 'Success') 
         {
             
         }
        
      } catch (error) {
        console.error('Error Add Comment', error);
      }
      
    }
    
    const showComments = async (postid) => {
      try {
        if (commentsBool === 0) {
          setShowComments(1);
        } else {
          setShowComments(0);
          if (commentsBool ===  1) {
            
            const response = await axios.get('http://localhost:3001/posts/showcomments',  { params: {
              postid: postid }});
    
            if (response.data.Status === 'Success') {
              console.log("intra");
              setCommentsPost(response.data.Comments);
              console.log(commentsPost);
            } else {
              console.error('Error fetching comments:', response.data.ErrorMessage);
            }
          }
        }
      } catch (error) {
        console.error('Error in showComments:', error);
      }
    };
    
    const addComment = async (postid) => {
      
      setComment({
        ...comment,
        postid: postid
      });

      console.log(comment);

      try {
        const response = await axios.post('http://localhost:3001/posts/addComment', {comment});
    
        if (response.data.Status === 'Success') 
         {
          setComment({
            ...comment,
            text: ""
          });
          showComments(postid);
         }
        
      } catch (error) {
        console.error('Error Add Comment', error);
      }
    }
    
    const deleteComment = async (postid, commId) => {
       try{

        const response = await axios.delete(`http://localhost:3001/posts/deletecomment/${commId}`);
        if(response.data.Status === 'Success'){
          showComments(postid);
          console.log('Foarte bine');
        }
       }catch(error){
        console.log(error);
       }
    }
    
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