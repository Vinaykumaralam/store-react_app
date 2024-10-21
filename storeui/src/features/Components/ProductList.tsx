import { Grid2 } from "@mui/material";
import { Product } from "../../app/models/Product";
import ProductCard from "./ProductCard";
import { UseAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./AppSkeleton";

interface Props{
    products:Product[];
}

export default function ProductList({products}:Props){
    const {productsLoaded}=UseAppSelector(state=>state.catalog);
    return(
        <Grid2 container spacing={4}>
            {products.map(product=>(
                <Grid2 size={{xs:4}} key={product.id}>
                    {!productsLoaded ? (
                        <ProductCardSkeleton></ProductCardSkeleton>
                    ):(<ProductCard product={product}></ProductCard>)}
                    
                </Grid2>
            ))}
        </Grid2>
    )
}