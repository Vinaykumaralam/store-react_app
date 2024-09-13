import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFoundPage(){
    return(
        <Container component={Paper} sx={{height:400}}>
            <>
            <Typography variant="h3" gutterBottom>Oops Page not found</Typography>
            <Divider/>
            <Button fullWidth component={Link} to='/catalog'>Home Page</Button>
            </>
        </Container>
    )
}