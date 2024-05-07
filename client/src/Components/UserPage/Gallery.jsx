import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const Gallery = (username) => {
    
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =  await axios.get('http://localhost:3001/posts/getimages', {params: {
                  username: username,
                   }
                });
                  if (response.data.Status === 'Success') {
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
   
    <ImageList sx={{ width: 500, height: 450 }}>
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