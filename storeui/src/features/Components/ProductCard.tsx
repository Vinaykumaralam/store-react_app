import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { Product } from "../../app/models/Product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/utils/util";
import { UseAppDispatch, UseAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../Basket/BasketSlicer";

interface Props{ 
    product:Product;
}
export default function ProductCard({product}:Props){
  const dispatch=UseAppDispatch();
  const {status}=UseAppSelector(state=>state.basket);

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
        <LoadingButton loading={status===('pending'+product.id)} 
            onClick={()=>dispatch(addBasketItemAsync({productId:product.id}))} 
        size="small">Add to Cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
        </>
    )
}