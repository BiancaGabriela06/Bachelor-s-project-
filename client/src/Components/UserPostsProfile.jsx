import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Grid, Avatar, CardHeader, Card, Skeleton, IconButton,
         CardMedia, CardContent, Typography, Button, TextField, Tooltip} from "@mui/material"
import PropTypes from 'prop-types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import { CommentTwoTone } from '@mui/icons-material';

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
      const fetchData = async () => {
      try {
          const response = await axios.post('http://localhost:3001/image/user', { username });
          if (response.data.Status === 'Success') {
          setProfileImage(response.data.profileimage);
          } else {
          console.log(response.err);
          }
      } catch (error) {
          console.error(error);
      }
      };

      fetchData();
  }, []);

    useEffect(() => { 
      console.log(commentsBool)
      const fetchData = async() => {
        try{
          const res = await axios.get('http://localhost:3001/posts/userposts', { params: {
              username: username }});
            if(res.data.Status === 'Success')
            {
                setUserPosts(res.data.data);
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
        <Grid container>
          User Posts: 
          {userPosts.map((post) => (
            
            <Card key={post.postid} sx={{ width: '700px', m: 2 }}>
              <CardHeader
                avatar={<Avatar alt="Profile picture" src={profileImage} />}
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={username}
                subheader={post.date}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" component="p">
                  {post.description}
                </Typography>
              </CardContent>
              <CardMedia component="img" height="300" image={post.image} />
              <Button onClick={increaseLikes}>
                <FavoriteBorderIcon /> {post.likes} likes
              </Button>
              <Button onClick={() => showComments(post.postid)}>
                <InsertCommentIcon /> {post.comments} comments
              </Button>
              {commentsBool ? (
                <Grid></Grid>
              ) : (
                <>
                  {commentsPost.map((comm, i) => (
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar alt="Remy Sharp" src={`http://localhost:3001/profileimages/` + comm.profileimage} 
                               style={{ width: '20px', height: '20px'}}/>
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <h5 style={{  margin: 0, textAlign: "left" }}>{comm.username}</h5>
                            <p style={{ textAlign: "left" }}> {comm.comment}</p>
                            <p style={{ textAlign: "left", color: "gray" }}>{comm.date}</p>
                          </Grid>
                        <Grid justifyContent="right" item xs zeroMinWidth>
                             {currentUser && currentUser.id === comm.id}
                             <Tooltip title="Delete">
                                  <IconButton onClick={() => deleteComment(post.postid, comm.commentid)}>
                                    <DeleteIcon />
                                  </IconButton>
                              </Tooltip>
                        </Grid>
                  </Grid>
                  ))}
                  <TextField fullWidth={true} label="Add a comment" value = {comment.text} onChange= {e => setComment({...comment, text: e.target.value})}/>
                  <Button onClick={() => addComment(post.postid)}><ReplyIcon/></Button>
                </>
              )}
            </Card>
          ))}
        </Grid>
      </>
    );
}

export default UserPostsProfile;