import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Article from "./Article"
import {Grid} from "@mui/material"

const Articles = ({ selectedCategory }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    console.log("Selected category")
    console.log(selectedCategory)
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
        
  const filteredArticles = selectedCategory ? articles.filter(article => article.categories === selectedCategory) : articles;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredArticles.map((article, index) => (
           <Grid item >
                <Article article={article}/> 
          </Grid>
        ))}
    </div>
  );
};

export default Articles;
