import LoadingComponent from "../../app/layout/LoadingComponent";
import { UseAppDispatch, UseAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./CatalogSlicer";
import ProductList from "./ProductList";
import {useEffect } from "react";


export default function Catalog(){
  const products=UseAppSelector(productSelectors.selectAll);
  const dispatch=UseAppDispatch();
  const {ProductsFetched,status}=UseAppSelector(state=>state.catalog);

  useEffect(()=>{
    if(!ProductsFetched) dispatch(fetchProductsAsync());
  },[ProductsFetched])
  
    if(status.includes('pending')) return <LoadingComponent message="Loading Products..."/>
    return(
    <>
    <ProductList products={products}></ProductList>
      </>
    )
}