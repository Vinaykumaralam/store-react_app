import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/Context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

export default function BasketPage(){

    const {basket,setBasket,removeItem}=useStoreContext();
    const [loading,setLoading]=useState(false);

    function handleAddItem(productId:number){
      setLoading(true);
      agent.Basket.AddItemstoCart(productId)
            .then(basket=>setBasket(basket))
            .catch(e=>console.log(e))
            .finally(()=>setLoading(false));
    }

    function handleRemoveItem(productId:number,quantity=1){
      setLoading(true);
      agent.Basket.RemoveItemFromCart(productId,quantity)
            .then(()=>removeItem(productId,quantity))
            .catch(e=>console.log(e))
            .finally(()=>setLoading(false));
    }

    if(!basket) return <Typography variant="h3">Basket feels light</Typography>
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
          <LoadingButton loading={loading} color="secondary" onClick={()=>handleAddItem(item.id)}>
            <Add/>
          </LoadingButton>
          {item.quantity}
          <LoadingButton loading={loading} color='secondary' onClick={()=>handleRemoveItem(item.id)}>
            <Remove/>
          </LoadingButton>
        </TableCell>
        <TableCell align="right">${((item.price /100)* item.quantity).toFixed(2)}</TableCell>
        <TableCell align="right">
          <LoadingButton loading={loading} onClick={()=>handleRemoveItem(item.id,item.quantity)} color="error">
            <Delete />
          </LoadingButton>
        </TableCell>
      </TableRow>
    ))}
</TableBody>

      </Table>
    </TableContainer>
        </>
    )
}