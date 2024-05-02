import React, {useState, useEffect} from 'react';
import { Card, CardContent, CardHeader, CardMedia,
     Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions,
     Grid, GridItem, Tooltip, TextField, Avatar, IconButton } from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import PropTypes from 'prop-types';
import axios from 'axios'

function SimpleDialog({ open, onClose, article }) {
  var currentUser = localStorage.getItem("currentUser");
  const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);
  var [commentsBool, setShowComments] = useState(1);
  var idarticle = article.idarticle;

  var [comment, setComment] = useState({
    username: username,
    text: "",
    articleid: 0,
  })
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/article/images', {idarticle});
        if (response.data.Status === 'Success') {
          setImages(response.data.Data);
        } else {
          console.log(response.err);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  },[])

  const handleClose = () => {
    onClose();
  };

  const showComments = async () => {
    console.log("Show comments for string: " + article.idarticle.toString());
    try {
      if (commentsBool === 0) {
        setShowComments(1);
      } else {
        setShowComments(0);
        if (commentsBool ===  1) {
          
          const response = await axios.get('http://localhost:3001/explore/article/showcomments',  { params: {
            idarticle: article.idarticle }});
  
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
    comment.articleid = idarticle;

    try {
      const response = await axios.post('http://localhost:3001/explore/article/addComment', {comment});
  
      if (response.data.Status === 'Success') 
       {
        setComment({
          ...comment,
          text: ""
        });
        showComments(idarticle);
       }
      
    } catch (error) {
      console.error('Error Add Comment', error);
    }
  }
 
  const deleteComment = async (articleid, commId) => {
    try{

     const response = await axios.delete(`http://localhost:3001/explore/article/deletecomment/${commId}`);
     if(response.data.Status === 'Success'){
       showComments(articleid);
       console.log('Foarte bine');
     }
    }catch(error){
     console.log(error);
    }
 }
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle  sx={{ m: 'auto', p: 2, textAlign: 'center', fontSize: '4rem' }} >{article.title}</DialogTitle>
      <DialogContent>
         <Grid>
          <Typography variant="h4" sx={{ pb: 2 }}>{article.text}</Typography>
         {images.map((image, index) => (
        <img key={index} 
          src={`http://localhost:3001/articleimages/${image.filename}`} 
          alt={`Image ${index}`} 
          style={{ 
            width: '90%', 
            height: '90%', 
            margin: '0 auto', 
            marginBottom: '20px' 
        }}
          />
          ))}
         </Grid>
      </DialogContent>
      <IconButton onClick={showComments}>
           <CommentIcon/> Comments
        </IconButton>
        {commentsBool ? (
                <Grid></Grid>
              ) : (
                <>
                  {comments && comments.map((comm, i) => (
                    <Grid container wrap="nowrap" spacing={2} style={{ padding: '1.5rem' }}>
                        <Grid item>
                            <Avatar alt="Remy Sharp" src={`http://localhost:3001/profileimages/` + comm.profileimage} 
                               style={{ width: '20px', height: '20px'}}/>
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                <h5 style={{ margin: 0 }}>{comm.username}</h5>
                            </div>
                            <p style={{ marginBottom: '8px', wordWrap: 'break-word' }}>{comm.comment}</p>
                            <p style={{ color: 'gray', fontSize: '0.8rem', marginTop: 'auto' }}>{comm.date}</p>
                        </Grid>
                        <Grid justifyContent="right" item xs zeroMinWidth>
                             {currentUser && currentUser.id === comm.idcomment}
                             <Tooltip title="Delete">
                                  <IconButton onClick={() => deleteComment(article.idarticle, comm.idcomment)}>
                                    <DeleteIcon />
                                  </IconButton>
                              </Tooltip>
                        </Grid>
                  </Grid>
                  ))}
                 <Grid container spacing={2} alignItems="center" style={{ padding: '1.5rem' }}>
                  <Grid item xs={9}>
                      <TextField
                          label="Add a comment"
                          value={comment.text}
                          onChange={e => setComment({ ...comment, text: e.target.value })}
                          fullWidth
                      />
                  </Grid>
                  <Grid item xs={3}>
                      <Button variant="contained" color = "success" onClick={() => handleComment(article.idarticle)} endIcon={<ReplyIcon />}>
                          Reply
                      </Button>
                  </Grid>
              </Grid>
              </>
         )}
      
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  article: PropTypes.object.isRequired,
};

const Article = ({ article }) => {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = useState("")

  const idarticle = article.idarticle;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/article/images', {idarticle});
        if (response.data.Status === 'Success') {
          console.log("Filename 1: ")
          console.log(response.data.Data[0].filename)
          setImage(response.data.Data[0].filename);
        } else {
          console.log(response.err);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  },[])

  return (
    <>
      <Button onClick={handleClickOpen}>
        <Card sx={{ width: '100rem' }} >
          <CardHeader
            title={article.title}
            subheader={article.date}
          />
          <CardMedia
            component="img"
            height="194"
            image={`http://localhost:3001/articleimages/${image}`}
            
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">

            </Typography>
          </CardContent>
        </Card>
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        article={article}
      />
    </>
  )

}

export default Article;
