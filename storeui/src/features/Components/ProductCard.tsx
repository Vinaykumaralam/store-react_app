import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { Product } from "../../app/models/Product";
import { Link } from "react-router-dom";

interface Props{
    product:Product;
}
export default function ProductCard({product}:Props){
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
          ${(product.price/100).toFixed(2)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.brand} / {product.pictureType}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to Cart</Button>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
        </>
    )
}
//..