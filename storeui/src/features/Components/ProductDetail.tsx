import { Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "../../app/error/NotFoundPage";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { UseAppDispatch, UseAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../Basket/BasketSlicer";
import { fetchProductAsync, productSelectors } from "./CatalogSlicer";

export default function ProductDetail(){
    const {basket,status}=UseAppSelector(state=>state.basket);
    const {status:productStatus}=UseAppSelector(state=>state.catalog);
    const dispatch=UseAppDispatch();
    const {id}=useParams<{id:string}>();
    const product=UseAppSelector(state=>productSelectors.selectById(state,Number(id)));
    const [quantity,setQuantity]=useState(0);
    const item=basket?.basketItems.find(i=>i.id===product?.id);

    function handleInputChange(event:any){
        if(event.target.value>=0){
        setQuantity(parseInt(event.target.value));
    }}
    function handleUpdateChange(productId:number){
        if(!item || quantity>item.quantity){
            const updatedQuantity=item ? quantity-item.quantity:quantity;
            dispatch(addBasketItemAsync({productId:product?.id!,quantity:updatedQuantity}))
        }else{
            const updatedQuantity=item.quantity-quantity;
            dispatch(removeBasketItemAsync({productId:product?.id!,quantity:updatedQuantity}))
        }
        
    }

    useEffect(()=>{
        if(item) setQuantity(item.quantity);
        if(!product&&id) dispatch(fetchProductAsync(parseInt(id)));
    },[id,item,dispatch,product])

    if(productStatus.includes('pending')) return <LoadingComponent message='Loading Product...'/>
    if(!product) return <NotFoundPage/>
    return(
        
        <Grid2 container spacing={6}>
            <Grid2 size={{xs:6}}>
                    <img src={product.pictureUrl} alt={product.name} style={{width:'100%'}}/>
            </Grid2>
            <Grid2 size={{xs:6}} >
                    <Typography variant="h4">{product.name}</Typography>
                    <Divider sx={{mb:2}}/>
                    <Typography variant="h5" color='secondary'>${(product.price/100).toFixed(2)}</Typography>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>
                            
                            <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>{product.pictureType}</TableCell>
                                </TableRow>
                            
                            <TableRow>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                </TableRow>
                           
                            <TableRow>
                                    <TableCell>Quantity in Stock</TableCell>
                                    <TableCell>{product.quantityInStock}</TableCell>
                                </TableRow>
                                </TableBody>

                        </Table>
                    </TableContainer>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{xs:6}}>
                            <TextField variant='outlined' type='number' label="Quantity in cart" fullWidth onChange={handleInputChange} value={quantity}/>
                        </Grid2>
                        <Grid2 size={{xs:6}}>
                            <LoadingButton loading={status.includes('pending'+item?.id)} disabled={item?.quantity===quantity ||( !item&&quantity===0)} sx={{height:'55px'}} size="large" onClick={()=>handleUpdateChange(product.id)} color="primary" variant="contained" fullWidth>
                                {item ? "Update Cart":"Add to Cart"}
                            </LoadingButton>
                        </Grid2>
                    </Grid2>
            </Grid2>

        </Grid2>
        
    )
}