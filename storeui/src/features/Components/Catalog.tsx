import { FormLabel, Grid2, Paper} from "@mui/material";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { UseAppDispatch, UseAppSelector } from "../../app/store/configureStore";
import { fetchProductFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./CatalogSlicer";
import ProductList from "./ProductList";
import {useEffect } from "react";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "./RadioButtonGroup";
import { CheckedItems } from "./CheckedItems";
import AppPagination from "./AppPagination";

const sortOptions=[
  {value:'name',name:'Alphabetical'},
  {value:'priceDesc',name:'Price - High to Low'},
  {value:'price',name:'Price - Low to High'}
]

export default function Catalog(){
  const products=UseAppSelector(productSelectors.selectAll);
  const dispatch=UseAppDispatch();
  const {productsLoaded,status,filtersLoaded,brands,types,productParams,metaData}=UseAppSelector(state=>state.catalog);

  useEffect(()=>{
    if(!productsLoaded) dispatch(fetchProductsAsync());
  },[productsLoaded,dispatch,])

  useEffect(()=>{
    if(!filtersLoaded) dispatch(fetchProductFilters());
  },[dispatch,filtersLoaded]);
  
    if(!filtersLoaded)  return <LoadingComponent message="Loading Products..."/>
    return(
    <>
    <Grid2 container columnSpacing={4}>
      <Grid2 size={{xs:3}}>
        <Paper sx={{mb:2}}>
          <ProductSearch/>
        </Paper>
        <Paper sx={{mb:2,p:2}}>
         <FormLabel>SORT BY</FormLabel>
           <RadioButtonGroup selectedValue={productParams.orderBy} options={sortOptions} onChange={(e)=>dispatch(setProductParams({orderBy:e.target.value}))}/>
        </Paper>
        <Paper sx={{mb:2,p:2}}>
          <FormLabel>BRANDS</FormLabel>
          <CheckedItems items={brands} checked={productParams.brand} onChange={(items:string[])=>dispatch(setProductParams({brand:items}))}/>
        </Paper>
        <Paper sx={{mb:2,p:2}}>
        <FormLabel>TYPES</FormLabel>
        <CheckedItems items={types} checked={productParams.type} onChange={(items:string[])=>dispatch(setProductParams({type:items}))}/>
        </Paper>
      </Grid2>
      <Grid2 size={{xs:9}}>
        <ProductList products={products}></ProductList>
      </Grid2>
      <Grid2 size={{xs:3}}></Grid2>
      <Grid2 size={{xs:9}} marginBottom='20px'>
        {metaData &&
            <AppPagination metaData={metaData} 
                            onPageChange={(page:number)=>dispatch(setPageNumber({pageNumber:page}))}/>
        }
   </Grid2>
    </Grid2>
    
    </>
    )
}