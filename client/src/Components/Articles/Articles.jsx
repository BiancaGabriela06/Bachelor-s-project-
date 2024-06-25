import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Article from "./Article"
import {Grid, Alert} from "@mui/material"

const Articles = ({ selectedCategory }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await axios.get('http://localhost:3001/explore/articles');
          if (response.data.Status === 'Success') {
              setArticles(response.data.Data);
          } else {
              console.log(response.data.err);
          }
      } catch (error) {
          console.log(error);
      }

      }
      fetchData();

        }, [selectedCategory])
        
    
    const filteredArticles = selectedCategory 
        ? articles.filter(article => 
            article.categories.replace(/^"|"$/g, '').split(',').map(category => category.trim().toLowerCase()).includes(selectedCategory.toLowerCase())
          )
        : articles;
        console.log(filteredArticles)
  return (
    <div>
    {filteredArticles.length === 0 ? (
      <Alert severity="info" sx={{fontSize: '2rem'}}>No articles found for the selected category.</Alert>
    ) : (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredArticles.map((article, index) => (
          <Grid item key={index}>
            <Article article={article} /> 
          </Grid>
        ))}
      </div>
    )}
  </div>
  );
};

export default Articles;
