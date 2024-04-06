import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

const Gallery = () => {
    
    const [photos, setPhotos] = useState([])
    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =  await axios.get('http://localhost:3001/posts/getimages', {params: {
                  username: username,
                   }
                });
                  if (response.data.Status === 'Success') {
                    console.log(response.data.Data);
                      setPhotos(response.data.Data);
                  }
                   else {
                      console.log(response.data.err);
                  }
              } catch (error) {
                  console.error(error);
              }
        }

        fetchData();
    }, [])

  return (
    <>
   
    <ImageList>
      {photos.map((item) => (
        <ImageListItem key={item.image}>
          <img
            src={`http://localhost:3001/postimages/` + item.image}
            alt={item.location}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.location}
          />
        </ImageListItem>
      ))}
    </ImageList>
    </>
  );
}

export default Gallery;