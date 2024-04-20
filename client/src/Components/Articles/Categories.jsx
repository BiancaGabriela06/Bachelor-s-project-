import React, { useState } from 'react';
import { Button, Box, ButtonGroup, Grid, Typography } from "@mui/material"

const buttons = [
  { label: "All", category: ""},
  { label: "Food", category: "food" },
  { label: "Vegan", category: "vegan" },
  { label: "Couple", category: "couple" },
];

const Categories = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    console.log(category);
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <>
      <Grid container padding = {5}>
        <Grid item  xs = {5} justifyContent="center">
            <Typography style={{ fontWeight: 'bold'}}>CATEGORIES</Typography>
        </Grid>
        <Grid item  xs = {8} justifyContent="center">
            <Box sx={{ display: 'flex', '& > *': { m: 1, }, }}>
              <ButtonGroup orientation="vertical" aria-label="Vertical button group">
                {buttons.map(({ label, category }) => (
                  <Button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    variant={selectedCategory === category ? "contained" : "outlined"}
                  >
                    {label}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
        </Grid>
        
      </Grid>
    </>
  )
}

export default Categories;
