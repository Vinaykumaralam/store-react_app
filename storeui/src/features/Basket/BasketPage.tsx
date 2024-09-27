import { Box, Button, Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { UseAppDispatch, UseAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./BasketSlicer";

export default function BasketPage(){
    const {basket,status}=UseAppSelector(state=>state.basket);
    const dispatch=UseAppDispatch();

    if(!basket) return <Typography variant="h3">Your Basket is empty</Typography>
    return (
        <>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} >
        <TableHead>
          <TableRow>
            <TableCell style={{display:'flex',justifyContent:"center"}}>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">SubTotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
                {basket.basketItems.map((item) => (
                <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
              <Box display='flex' alignItems='center'>
                <img src={item.pictureUrl} alt={item.name} style={{height:50,marginRight:20}}/>
                <span>{item.name}</span>
              </Box>
            </TableCell>
        <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
        <TableCell align="center">
          <LoadingButton loading={status===('pending'+item.id)} color="secondary" 
                         onClick={()=>dispatch(addBasketItemAsync({productId:item.id}))}>
            <Add/>
          </LoadingButton>
          {item.quantity}
          <LoadingButton loading={status===('pendingRemoveItem'+item.id+'rem')}
                       color='secondary' onClick={()=>dispatch(removeBasketItemAsync({productId:item.id,quantity:1,name:'rem'}))}>
            <Remove/>
          </LoadingButton>
        </TableCell>
        <TableCell align="right">${((item.price /100)* item.quantity).toFixed(2)}</TableCell>
        <TableCell align="right">
          <LoadingButton loading={status===('pendingRemoveItem'+item.id+'del')}
                         onClick={()=>dispatch(removeBasketItemAsync({productId:item.id,quantity:item.quantity,name:'del'}))} color="error">
            <Delete />
          </LoadingButton>
        </TableCell>
      </TableRow>
    ))}
</TableBody>

      </Table>
    </TableContainer>

    <Grid2 container>
      <Grid2 size={{xs:6}}/>
          <Grid2 size={{xs:6}}>
              <BasketSummary />
              <Button component={Link} to={'/checkout'} variant="contained" size='large' fullWidth>Checkout</Button>
          </Grid2>
    </Grid2>
        </>
    )
}