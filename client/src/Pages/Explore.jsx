import React, {useEffect, axios, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import {Grid, Typography, Divider, Button} from "@mui/material"
import Intro from "../Components/Articles/Intro"
import SearchBar from '../Components/Articles/SearchBar'
import Categories from '../Components/Articles/Categories'
import Articles from '../Components/Articles/Articles'
import OpenItinerary from '../Components/Itinerary/OpenItinerary'

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
        <Grid container xs = {18} padding={5}>
          <Grid item spacing = {5} xs = {6}>
            <Categories sx={{margin: 10}}onCategorySelect={handleCategorySelect} />
          </Grid>
          <Grid item xs = {12} sm={6} md={2}>
          <Articles selectedCategory={selectedCategory} />
          </Grid>
        </Grid>
        <OpenItinerary/>
        <Footer/>
        </>
      )
}

export default Explore