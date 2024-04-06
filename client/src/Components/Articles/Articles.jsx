import React, { useEffect, useState } from 'react';

const Articles = ({ selectedCategory }) => {

  const articles = [
    { title: "Article 1", category: "food" },
    { title: "Article 2", category: "vegan" },
    { title: "Article 3", category: "couple" },
    { title: "Article 4", category: "food" },
  ];

  useEffect(() => {
    console.log("Selected category")
    console.log(selectedCategory)
  })
  
  const filteredArticles = selectedCategory ? articles.filter(article => article.category === selectedCategory) : articles;

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {filteredArticles.map((article, index) => (
          <li key={index}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
