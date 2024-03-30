import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {Container, Grid, Avatar, Button, TextField, Autocomplete, Typography} from "@mui/material"
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const FeedForum = () => {
    const navigate = useNavigate();
    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
    const [file, setFile] = useState("");
    const [places, setPlaces] = useState([])
    const [groupSelected, setGroupSelected] = useState([])
    const [location, setLocation] = useState("")
    var [profileImage, setProfileImage] = useState();
    const [groups, setGroups] = useState([]);
    const [post, setPost] = useState({
        username: "",
        filename: "",
        description: "",
        location: ""
    });

    useEffect(() => {
        const fetchData1 = async () => {
        try {
            const response = await axios.post('http://localhost:3001/image/user', { username });
            if (response.data.Status === 'Success') {
            console.log(response.data.Data);
            setProfileImage(response.data.Data);
            } else {
            console.log(response.err);
            }
        } catch (error) {
            console.error(error);
        }
        };

        const fetchData2 = async () => {
            try{
                axios.get('http://localhost:3001/dashboard/groupuser', {params: { username: username}})
                .then(response => {
                    if(response.data.Status === 'Success')
                    setGroups(response.data.Data);
                })
                .catch(error => {
                    console.error("Error fetching groups:", error);
                });
            }catch(error){
                console.log(error);
            }
        }

        const fetchData3 = async () => {
                try {
                    const response = await axios.get('http://localhost:3001/places/listofcities');
                    if (response.data.Status === 'Success') {
                        setPlaces(response.data.Data);
                    } else {
                        console.log(response.data.err);
                    }
                } catch (error) {
                    console.log(error);
                }

        }
        console.log(profileImage);

        fetchData3();
        fetchData2();
        fetchData1();
    }, []);


    const fileHandler = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
      
        const formdata = new FormData();
        formdata.append('file', selectedFile);
      
        try {
          const response = await axios.post('http://localhost:3001/image/post', formdata);
      
          if (response.data.Status === 'Success') {
            post.filename = response.data.filename;
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };

    const sharePost = () => {
        post.username = username;
        console.log(post);

        axios.post('http://localhost:3001/posts/sharepost', post)
        .then(res => {
              if(res.data.Status === 'Success') {
                   post.filename =""
                   setFile("")
                   navigate("/profile2")
              }
              else{
                 console.log(res.data.Error)
              }
        })
        .catch(err => console.log(err))

 }

    return(
        <>
         <Container>
         <Grid container columns={16} style={{padding: '10px', border: '1px solid #228B22'}}>
                                
                                <Grid item xs = {1}>
                                     <Avatar src={`http://localhost:3001/profileimages/` + profileImage} alt={username} />
                                </Grid>
                                <Grid item xs = {12}>
                                 <TextField fullWidth={true} label={`What's on your mind, ${username}?`} 
                                         onChange={e => setPost({...post, description: e.target.value})}
                                         style={{ borderBottom: 'none' }}/>
                                </Grid>
                                <Grid item xs={4}>
                                     <Button>
                                         
                                         <input
                                                 type="file"
                                                 id="file"
                                                 accept="image/*"
                                                 style={{ display: "none" }}
                                                 onChange={fileHandler}
                                                 />
                                                 <label htmlFor="file">
                                                 <CameraAltIcon style={{fontSize: '30px'}}/>
                                                 </label>
                                     </Button>
                                     {file.name && (
                                         <Grid container>
                                             <Avatar src={file.name} variant="square" />
                                             <Typography>{file.name}</Typography>
                                     </Grid>
                                      )}
                                 </Grid>
                                 <Grid item xs={6}>
                                     <Grid item xs = {2}> 
                                     <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={groups.map((group) => group.title)}
                                            sx={{ width: 300 }}
                                            value={groupSelected}
                                            onChange={(event, newValue) => {
                                                setGroupSelected(newValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Groups" />
                                            )}
                                        />
                                      </Grid>
                                     <Grid item xs = {6}>
                                             <Autocomplete id="combo-box-demo" options={places.map((option) => option.name)} sx={{ width: 200, height: 50 }}
                                                 renderInput={(params) => <TextField {...params} label="Location" variant="filled" 
                                                 value={location}
                                                 onChange={(e) => { setLocation( e.target.value)}}
                                                 />}
                                                 value={location}
                                                 onChange={(event, value) => setLocation(value)}/>
                                 
                                     </Grid>
                
 
                                </Grid>
                                <Grid item xs = {2}>
                                    <Button variant = "outlined" style = {{color: '#228B22'}}onClick={sharePost}>Share Post</Button>
                                </Grid>
                                 
                             </Grid>
         </Container>
        </>
    )
}

export default FeedForum;