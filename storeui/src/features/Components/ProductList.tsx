import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { Product } from "../../app/models/Product";

interface Props{
    products:Product[];
}

export default function ProductList({products}:Props){
    return(
        <>
        <List>
        {products.map(products=>(
          <ListItem key={products.id}>
            <ListItemAvatar>
                <Avatar src={products.pictureUrl}/>
            </ListItemAvatar>
            <ListItemText>
                {products.name} - {products.price}
            </ListItemText>
          </ListItem>
        ))}
    </List>
    </>
    )
}