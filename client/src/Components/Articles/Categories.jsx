import React, { useState } from 'react';
import { Button, Box, ButtonGroup, Grid, Typography } from "@mui/material"

const buttons = [
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
      <Grid container>
        <Typography>Categories</Typography>
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
    </>
  )
}

export default Categories;
