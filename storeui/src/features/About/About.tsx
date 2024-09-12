import { Alert, AlertTitle, Button, ButtonGroup,List, Container, ListItem, ListItemText, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";
export default function AboutPage(){

    const [ValidationError,setValidationError]=useState<string[]>([]);

    function getValidationError(){
        agent.TestErrors.getValidationError()
        .then(()=>console.log("Never excutes"))
        .catch(errors=>setValidationError(errors));
    }

    return(
        <Container>
            <Typography gutterBottom variant="h2">Testing Errors</Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={()=>agent.TestErrors.get400Error().catch(error=>console.log(error))}>400 Error</Button>
                <Button variant='contained' onClick={()=>agent.TestErrors.get401Error().catch(error=>console.log(error))}>401 Error</Button>
                <Button variant='contained' onClick={()=>agent.TestErrors.get404Error().catch(error=>console.log(error))}>404 Error</Button>
                <Button variant='contained' onClick={()=>agent.TestErrors.get500Error().catch(error=>console.log(error))}>500 Error</Button>
                <Button variant='contained' onClick={getValidationError}>Validation Error</Button>
            </ButtonGroup>

            {ValidationError.length > 0 && 
                <Alert severity='error'>
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {ValidationError.map(error=>(
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List> 
                </Alert>
            }
        </Container>
    )
}