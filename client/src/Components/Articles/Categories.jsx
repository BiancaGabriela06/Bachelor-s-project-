import React, { useState } from 'react';
import { Button, Box, ButtonGroup, Grid, Typography } from "@mui/material"

const buttons = [
  { label: "All", category: ""},
  { label: "Accomodation", category: "accomodation" },
  { label: "Vegan", category: "vegan" },
  { label: "Couple", category: "couple" },
  {label: "Europe", category: "europe"},
  {label: "Eco", category: "eco"},
  {label: "Mountains", category: "mountains"}
];

const Categories = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <>
      <Grid container padding = {5}>
        <Grid item  xs = {5} justifyContent="center">
            <Typography style={{ marginLeft: '3rem', fontWeight: 'bold'}}>CATEGORIES</Typography>
        </Grid>
        <Grid item  xs = {8} justifyContent="center">
            <Box sx={{ display: 'flex', '& > *': { m: 1, }, }}>
              <ButtonGroup orientation="vertical" aria-label="Vertical button group">
                {buttons.map(({ label, category }) => (
                  <Button
                    color="success"
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
