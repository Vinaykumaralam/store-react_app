import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { Product } from "../../app/models/Product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/Context/StoreContext";
import { currencyFormat } from "../../app/utils/util";

interface Props{
    product:Product;
}
export default function ProductCard({product}:Props){
  const {setBasket}=useStoreContext();
  const [loading,setLoading]=useState(false);

  function handleAddItem(productId:number){
      setLoading(true);
      agent.Basket.AddItemstoCart(productId)
        .then(basket=>setBasket(basket))
        .catch(error=>console.log(error))
        .finally(()=>setLoading(false));
  }
    return (
        <>
        <Card>
            <CardHeader 
            avatar={
                <Avatar sx={{backgroundColor:'secondary.main'}}>{product.name.charAt(0).toUpperCase()}</Avatar>
                
            }
            title={product.name}
            titleTypographyProps={{
                sx:{fontWeight:'bold',color:'info.main'}
            }}
            />
      <CardMedia
        sx={{ height: 140 ,backgroundSize:'contain',backgroundColor:'lightblue'}}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color='secondary'>
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.brand} / {product.pictureType}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={loading} onClick={()=>handleAddItem(product.id)} 
        size="small">Add to Cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
        </>
    )
}