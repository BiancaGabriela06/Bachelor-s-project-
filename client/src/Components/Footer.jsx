import React from 'react'
import { Box, Grid, Container, Typography, Link, Divider} from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
    return (
        <Box
      component="footer"
      sx={{
        p: 6,
        mt: 0
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column' }} >
      <Divider />
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              EcoVoyage is a company dedicated to responsible and sustainable traveling. 
              Feel free to visit the world and be friend with the planet.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bucharest, Romania
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: ecovoyage@gmail.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="http://localhost:3000/home">
              EcoVoyage
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
    )
}

export default Footer;