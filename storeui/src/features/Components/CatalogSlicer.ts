import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/Product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter=createEntityAdapter<Product>();

export const fetchProductsAsync=createAsyncThunk<Product[]>(
    'Catalog/fetchProductsAsync',
    async()=>{
        try {
            return await agent.Catalog.list();
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchProductAsync=createAsyncThunk<Product,number>(
    'Catalog/fetchProductAsync',
    async(productId)=>{
        try {
            return await agent.Catalog.details(productId);
        } catch (error) {
            console.log(error);
        }
    }
)

export const CatalogSlicer=createSlice({
    name:'Catalog',
    initialState:productsAdapter.getInitialState({
        ProductsFetched:false,
        status:'idle'
    }),
    reducers:{},
    extraReducers:(builder=>{
        builder.addCase(fetchProductsAsync.pending,(state)=>{
            state.status='pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled,(state,action)=>{
            productsAdapter.setAll(state,action.payload);
            state.ProductsFetched=true;
            state.status='idle';
        });
        builder.addCase(fetchProductsAsync.rejected,(state)=>{
            state.status='idle';
        });
        builder.addCase(fetchProductAsync.pending,(state)=>{
            state.status='pendingFetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled,(state,action)=>{
            productsAdapter.upsertOne(state,action.payload);
            state.status='idle';
        });
        builder.addCase(fetchProductAsync.rejected,(state)=>{
            state.status='idle';
        });
    })
})

export const productSelectors=productsAdapter.getSelectors((state:RootState)=>state.catalog);