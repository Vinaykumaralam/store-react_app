import { Box, Button, Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import {  useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { UseAppDispatch, UseAppSelector } from "../../app/store/configureStore";
import { removeItem, setBasket } from "./BasketSlicer";

export default function BasketPage(){
    const {basket}=UseAppSelector(state=>state.basket);
    const dispatch=UseAppDispatch();
    const [status,setStatus]=useState({
      loading:false,
      name:''
    });

    function handleAddItem(productId:number,name:string){
      setStatus({loading:true,name});
      agent.Basket.AddItemstoCart(productId)
            .then(basket=>dispatch(setBasket(basket)))
            .catch(e=>console.log(e))
            .finally(()=>setStatus({loading:false,name:''}));
    }

    function handleRemoveItem(productId:number,quantity=1,name:string){
      setStatus({loading:true,name});
      agent.Basket.RemoveItemFromCart(productId,quantity)
            .then(()=>dispatch(removeItem({productId,quantity})))
            .catch(e=>console.log(e))
            .finally(()=>setStatus({loading:false,name:''}));
    }

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
          <LoadingButton loading={status.loading && status.name==="add"+item.id} color="secondary" 
                         onClick={()=>handleAddItem(item.id,"add"+item.id)}>
            <Add/>
          </LoadingButton>
          {item.quantity}
          <LoadingButton loading={status.loading && status.name==="rem"+item.id}
                       color='secondary' onClick={()=>handleRemoveItem(item.id,1,"rem"+item.id)}>
            <Remove/>
          </LoadingButton>
        </TableCell>
        <TableCell align="right">${((item.price /100)* item.quantity).toFixed(2)}</TableCell>
        <TableCell align="right">
          <LoadingButton loading={status.loading && status.name==="del"+item.id}
                         onClick={()=>handleRemoveItem(item.id,item.quantity,"del"+item.id)} color="error">
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