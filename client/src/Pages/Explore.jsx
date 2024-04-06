import React, {useEffect, axios, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import {Grid, Typography, Divider, Button} from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Intro from "../Components/Articles/Intro"
import SearchBar from '../Components/Articles/SearchBar'
import Categories from '../Components/Articles/Categories'
import Articles from '../Components/Articles/Articles'

const Explore = () => {
  const navigate =  useNavigate();
  const [admin, setAdmin] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Category selected in explore ")
    console.log(category)
  };

      return (
        <>
        <Navbar/>
          <Intro/>
          <Divider/>
        <Grid container padding={5}>
          <Grid item>
            <SearchBar/>
            <Categories onCategorySelect={handleCategorySelect} />
          </Grid>
          <Grid item>
          <Articles selectedCategory={selectedCategory} />
          </Grid>
        </Grid>

        <Footer/>
        </>
      )
}

export default Explore