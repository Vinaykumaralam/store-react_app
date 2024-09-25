// import { Typography } from "@mui/material";

// export default function HomePage(){
//     return(
//         <>
//         <Typography variant="h2">Home Page</Typography>
//         </>
//     )
// }
import { Typography, Container, Grid, Button, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to React Store
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Your one-stop destination for amazing products.
        </Typography>
        <Button component={Link} to={"/Register"} variant="contained" color="primary" sx={{ mt: 3 }}>
          Get Started
        </Button>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ mt: 5 }}>
        <Grid item xs={12} md={4} component={Link} to={'/Catalog'} sx={{textDecoration:'none'}}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2">
              Our Products
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
              Description of feature one. Highlighting key benefits and why it stands out.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} component={Link} to={'/basket'} sx={{textDecoration:'none'}}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2">
              Cart
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
              Description of feature two. Explaining how this feature makes a difference.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2">
              Feature Three
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
              Description of feature three. Focusing on the user benefits.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Call to Action Section */}
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to Experience the Best?
        </Typography>
        <Button component={Link} to={'/Contact'} variant="contained" color="secondary" size="large">
          Learn More
        </Button>
      </Box>

      {/* Footer Section */}
      <Box sx={{ mt: 10, py: 5, backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}>
        <Typography variant="body1" component="p">
          &copy; 2024 xyz react-store. All Rights Reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
