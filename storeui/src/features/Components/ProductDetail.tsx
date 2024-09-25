import { Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/Product";
import agent from "../../app/api/agent";
import NotFoundPage from "../../app/error/NotFoundPage";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { UseAppDispatch, UseAppSelector } from "../../app/store/configureStore";
import { removeItem, setBasket } from "../Basket/BasketSlicer";

export default function ProductDetail(){
    const {basket}=UseAppSelector(state=>state.basket);
    const dispatch=UseAppDispatch();
    const {id}=useParams<{id:string}>();
    const[product,setProduct]=useState<Product | null>();
    const[Loading,setLoading]=useState(true);
    const [quantity,setQuantity]=useState(0);
    const [submitting,setSubmitting]=useState(false);
    const item=basket?.basketItems.find(i=>i.id===product?.id);

    function handleInputChange(event:any){
        if(event.target.value>=0){
        setQuantity(parseInt(event.target.value));
    }}
    function handleUpdateChange(productId:number){
        setSubmitting(true);
        if(!item || quantity>item.quantity){
            const updatedQuantity=item ? quantity-item.quantity:quantity;
            agent.Basket.AddItemstoCart(productId,updatedQuantity)
                        .then(basket=>dispatch(setBasket(basket)))
                        .catch(e=>console.log(e))
                        .finally(()=>setSubmitting(false));
        }else{
            const updatedQuantity=item.quantity-quantity;
            agent.Basket.RemoveItemFromCart(product?.id!,updatedQuantity)
                        .then(()=>dispatch(removeItem({productId:product?.id!,quantity:updatedQuantity})))
                        .catch(e=>console.log(e))  
                        .finally(()=>setSubmitting(false));
        }
        
    }

    useEffect(()=>{
        if(item) setQuantity(item.quantity);
        id && agent.Catalog.details(parseInt(id))
            .then(response=>setProduct(response))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false));
    },[id,item])

    if(Loading) return <LoadingComponent message='Loading Product...'/>
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
                            <LoadingButton disabled={item?.quantity===quantity ||( !item&&quantity===0)} sx={{height:'55px'}} size="large" onClick={()=>handleUpdateChange(product.id)} color="primary" variant="contained" fullWidth>
                                {item ? "Update Cart":"Add to Cart"}
                            </LoadingButton>
                        </Grid2>
                    </Grid2>
            </Grid2>

        </Grid2>
        
    )
}