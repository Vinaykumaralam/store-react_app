import { debounce, TextField } from "@mui/material";
import { UseAppDispatch, UseAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./CatalogSlicer";
import { useState } from "react";

export default function ProductSearch(){
    const {productParams}=UseAppSelector(state=>state.catalog);
    const dispatch=UseAppDispatch();
    const [searchTerm,setSearchTerm]=useState(productParams.searchTerm);
    const debounceSearch=debounce((event:any)=>{
        dispatch(setProductParams({searchTerm:event.target.value}));
    },1000)
    return(
        <TextField  label="Search Products" variant='outlined' fullWidth
        value={searchTerm||''} 
        onChange={(event:any)=>{
            setSearchTerm(event.target.value); 
            debounceSearch(event);
        }}/>
    )
}  