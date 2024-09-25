import { Button, ButtonGroup, Typography } from "@mui/material";
import { UseAppDispatch, UseAppSelector } from "../../app/store/configureStore";
import { increment,decrement } from "./ContactSlicer";

export default function ContactPage(){
    const dispatch=UseAppDispatch();
    const {data,title}=UseAppSelector(state=>state.counter);
    return(
        <>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="h2">{data}</Typography>
        <ButtonGroup>
            <Button onClick={()=>dispatch(increment(1))} variant='contained' color='primary'>Increment</Button>
            <Button onClick={()=>dispatch(decrement(1))} variant='contained' color='error'>Decrement</Button>
            <Button onClick={()=>dispatch(increment(5))} variant='contained' color='secondary'>Increment By 5</Button>
        </ButtonGroup>
        </>
    )
}