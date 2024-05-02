import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Avatar, Grid, Tooltip, Card, CardContent, CardHeader,
         Button, CardMedia, IconButton, TextField, Typography,
         Dialog, DialogTitle} from '@mui/material';
import PropTypes from 'prop-types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import PlaceIcon from '@mui/icons-material/Place';
import PeopleIcon from '@mui/icons-material/People';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function SimpleDialog(props) {
  const { onClose, answer, open } = props;

  const handleClose = () => {
    onClose(answer);
  };

  const handleDelete = (value) => {
      onClose(value);
  }
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Are you sure you want to delete the post?</DialogTitle>
      <Button color="success" onClick={() => handleDelete(1)}>Yes, delete it</Button>
      <Button color="success" onClick={handleClose}>Cancel</Button>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};


const Post = ({postid, user, likes, profileImage, postData, description, location, group, photo }) => {
  const [comments, setComments] = useState([]);
  var currentUser = localStorage.getItem("currentUser");
  const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
  var [commentsBool, setShowComments] = useState(1);
  var [Likes, setLikes] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [buttonDeletePost, setButtonDeletePost] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [answer, setAnswer] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (value) => {
    setOpen(false);
    setAnswer(value);

    
  };

  var [comment, setComment] = useState({
    username: username,
    text: "",
    postid: 0,
  })

  useEffect(() => {
      if(username === user)
        setButtonDeletePost(1);
      
      if(answer === 1){
          console.log(answer)
          try{
    
            const response = axios.delete(`http://localhost:3001/posts/deletepost/${postid}`);
            if(response.data.Status === 'Success'){
              window.location.reload(false);
            }
           }catch(error){
            console.log(error);
           }
        }
          
  }, [])

  const handleLike = async () => {
    const values = {
      postId: postid,
      user: user,
      likes: Likes+1
    }
    try {
      const response = await axios.post('http://localhost:3001/posts/increaselikes', values);
  
      if (response.data.Status === 'Success') 
       {    setLiked(true);
            setLikes(response.data.Likes);
       }
      
    } catch (error) {
      console.error('Error Add Comment', error);
    }
    
  }
  

  const showComments = async () => {
    console.log("Show comments for string: " + postid.toString());
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
            setComments(response.data.Comments);
            console.log(comments);
          } else {
            console.error('Error fetching comments:', response.data.ErrorMessage);
          }
        }
      }
    } catch (error) {
      console.error('Error in showComments:', error);
    }
  };
  
  const handleComment = async () => {
    comment.postid = postid;

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
    <Grid container justifyContent="center">
    <Card sx={{margin: '10px', position: 'relative' }}>
      <Button size="large" color="success" onClick={handleClickOpen} style={{  position: 'absolute', top: 0, right: 0  }}><DeleteForeverIcon/>DELETE POST</Button>
      <SimpleDialog
        answer={answer}
        open={open}
        onClose={handleClose}
      />
      <CardHeader
        avatar={<Avatar src={`http://localhost:3001/profileimages/` + profileImage} alt={user} />}
        title= {
          <Link to={`/users/${user}`} style={{ textDecoration: 'none', color: 'inherit', fontSize: '1.5rem' }}>
             {user}
          </Link>
        }
        subheader={new Date(postData).toLocaleString()}
      />
      <CardContent>
        <Typography variant="h5">{description}</Typography>
        <Typography variant="h6"><PlaceIcon sx={{fontSize: '2rem' , padding: "3px"}}/>{location}</Typography>
        <Typography variant="h6"><PeopleIcon sx={{fontSize: '2rem' , padding: "3px"}}/>{group}</Typography>
      </CardContent>
      {photo && <CardMedia component="img" image={`http://localhost:3001/postimages/` + photo} alt="Post" />}
      <CardContent>
        <IconButton onClick={handleLike} disabled={liked}>
          <FavoriteIcon /> {Likes} Likes
        </IconButton>
        <IconButton onClick={showComments}>
           <CommentIcon/> Comments
        </IconButton>
        {commentsBool ? (
                <Grid></Grid>
              ) : (
                <>
                  {comments && comments.map((comm, i) => (
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar alt="Remy Sharp" src={`http://localhost:3001/profileimages/` + comm.profileimage} 
                               style={{ width: '20px', height: '20px'}}/>
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <h5 style={{  margin: 0, textAlign: "left" }}>
                               <Link to={`/users/${comm.username}`} style={{ textDecoration: 'none', color: 'inherit', fontSize: '1.5rem' }}>
                                   {comm.username}
                               </Link></h5>
                            <p style={{ textAlign: "left" }}> {comm.comment}</p>
                            <p style={{ textAlign: "left", color: "gray" }}>{comm.date}</p>
                          </Grid>
                        <Grid justifyContent="right" item xs zeroMinWidth>
                             {currentUser && currentUser.id === comm.id}
                             <Tooltip title="Delete">
                                  <IconButton color="success" onClick={() => deleteComment(postid, comm.commentid)}>
                                    <DeleteIcon />
                                  </IconButton>
                              </Tooltip>
                        </Grid>
                  </Grid>
                  ))}
                 <Grid container spacing={2} alignItems="center">
                  <Grid item xs={9}>
                      <TextField
                          label="Add a comment"
                          value={comment.text}
                          onChange={e => setComment({ ...comment, text: e.target.value })}
                          fullWidth
                      />
                  </Grid>
                  <Grid item xs={3}>
                      <Button variant="contained" color="success" onClick={() => handleComment(postid)} endIcon={<ReplyIcon />}>
                          Reply
                      </Button>
                  </Grid>
              </Grid>
                </>
              )}
         </CardContent>
       </Card>
    </Grid>
  );
};

export default Post;
