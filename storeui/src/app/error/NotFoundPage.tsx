import { Image } from "@mui/icons-material";
import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFoundPage(){
    return(
        <Container component={Paper} sx={{height:500,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <>
            {/* <Typography variant="h3" gutterBottom>Oops Page not found</Typography>
            <Divider/> */}
            <img src="/images/page-not-found-icon.jpg"  alt='Page not found' style={{width:'30%',marginBottom:"20px"}}/>
            <Typography variant="h6" sx={{marginBottom:'20px'}}>Unable to find the page ...</Typography>
            <Button variant='contained' component={Link} to='/'>Home Page</Button>
            </>
        </Container>
    )
}