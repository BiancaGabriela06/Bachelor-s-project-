import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {Alert} from "@mui/material"

const Gallery = (username) => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);


  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:3001/posts/getimages', {
                  params: {
                      username: username,
                  },
              });
              if (response.data.Status === 'Success') {
                  console.log(response.data.Data);
                  setPhotos(response.data.Data);
              } else {
                  console.log(response.data.err);
              }
          } catch (error) {
              console.error(error);
          }
      };

      fetchData();
  }, []);

  const handlePhotoClick = (index) => {
      setSelectedPhotoIndex(index);
  };

  const handleCloseFullScreen = () => {
      setSelectedPhotoIndex(null);
  };

  return (
      <>
    {photos.length === 0 ? (
        <Alert severity="info" sx={{fontSize: '3rem'}}>No photos found.</Alert>
      ) : (
        <ImageList cols={3} gap={8}>
          {photos.map((item, index) => (
            <ImageListItem key={item.image} onClick={() => handlePhotoClick(index)}>
              <img src={`http://localhost:3001/postimages/${item.image}`} alt={item.location} loading="lazy" />
              <ImageListItemBar title={item.location} />
            </ImageListItem>
          ))}
        </ImageList>
      )}

          {selectedPhotoIndex !== null && (
              <div className="fullscreen-overlay" onClick={handleCloseFullScreen}>
                  <div className="fullscreen-image">
                      <img src={`http://localhost:3001/postimages/${photos[selectedPhotoIndex].image}`} alt={photos[selectedPhotoIndex].location} />
                  </div>
              </div>
          )}
      </>
  );
};

export default Gallery;