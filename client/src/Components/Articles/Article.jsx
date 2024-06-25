import React, {useState, useEffect} from 'react';
import { Card,  CardHeader, CardMedia,
     Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions,
     Grid,  Tooltip, TextField, Avatar, IconButton } from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import PropTypes from 'prop-types';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function SimpleDialog({ open, onClose, article }) {
  var currentUser = localStorage.getItem("currentUser");
  const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);
  var [commentsBool, setShowComments] = useState(1);
  const  categoriescleaned = article.categories.replace(/^"|"$/g, '');
  const categories = categoriescleaned.split(',').map(category => category.trim()).join(', ');

  var idarticle = article.idarticle;

  var [comment, setComment] = useState({
    username: username,
    text: "",
    articleid: 0,
  })
  
  const navigate = useNavigate();
  const handleNameClick = (user) => {
    if(username === user){
      navigate(`/profile`);
    }
    else{
      navigate(`/users/${user}`)
    }
  };
  

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
    try {
      if (commentsBool === 0) {
        setShowComments(1);
      } else {
        setShowComments(0);
        if (commentsBool ===  1) {
          
          const response = await axios.get('http://localhost:3001/explore/article/showcomments',  { params: {
            idarticle: article.idarticle }});
  
          if (response.data.Status === 'Success') {
            setComments(response.data.Comments);
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
     }
    }catch(error){
     console.log(error);
    }
 }
  return (
    <>
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle  sx={{ m: 'auto', p: 2, textAlign: 'center', color: '#228B22', fontSize: '4rem', fontWeight: 'bold'}} >{article.title}</DialogTitle>
      <DialogContent>
        <Grid>
        <Typography onClick={() => handleNameClick(article.username)} variant="h4" sx={{marginLeft: '1rem'}}>Author: <span style={{ fontWeight: 'bold' }} >{article.username}</span></Typography>
        <Typography variant="h4" sx={{marginLeft: '1rem'}}>Date: {new Date(article.date).toLocaleString()}</Typography>
        <Typography variant="h4" sx={{marginLeft: '1rem'}}>Categories: {categories}</Typography>
        </Grid>
         <Grid sx={{marginTop: '4rem'}}>
          <Typography variant="h4" sx={{ pb: 2 }}>{article.text}</Typography>
         {images.map((image, index) => (
        <img key={index} 
          src={`http://localhost:3001/articleimages/${image.filename}`} 
          alt={`Image ${index}`} 
          style={{ 
            width: '100%', 
            height: '100%', 
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
        <Button color="success" variant="contained" onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
    </>
   
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
        <Card sx={{ width: '100rem', marginTop: '3rem' }} >
          <CardHeader
            title={
              <Typography variant="h4" style={{color: '#228B22'}} fontWeight="bold">
                {article.title}
              </Typography>
            }
            subheader={new Date(article.date).toLocaleString()}
          />
          <CardMedia
            component="img"
            height="200"
            image={`http://localhost:3001/articleimages/${image}`}
          />
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
