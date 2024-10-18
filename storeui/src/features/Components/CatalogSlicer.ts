import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../app/models/Product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

interface CatalogState{
    productsLoaded:boolean;
    filtersLoaded:boolean;
    status:string;
    brands:string[];
    types:string[];
    productParams:ProductParams;
}
const productsAdapter=createEntityAdapter<Product>();

function getAxiosParams(productParams:ProductParams){
    const params=new URLSearchParams();
    params.append('pageNumber',productParams.pageNumber.toString());
    params.append('pageSize',productParams.pageSize.toString());
    params.append('orderBy',productParams.orderBy);
    if(productParams.searchTerm)  params.append('searchTerm',productParams.searchTerm);
    if(productParams.brand)params.append('brands',productParams.brand.toString());
    if(productParams.type)params.append('Type',productParams.type.toString());
    return params;
}
export const fetchProductsAsync=createAsyncThunk<Product[],void,{state:RootState}>(
    'Catalog/fetchProductsAsync',
    async(_,thunkAPI)=>{
        const params=getAxiosParams(thunkAPI.getState().catalog.productParams);
        try {
            return await agent.Catalog.list(params);
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error:error.data});
        }
    }
)

export const fetchProductAsync=createAsyncThunk<Product,number>(
    'Catalog/fetchProductAsync',
    async(productId,thunkAPI)=>{
        try {
            return await agent.Catalog.details(productId);
        } catch (e:any) {
            return thunkAPI.rejectWithValue({error:e.data});
        }
    }
)

export const fetchProductFilters=createAsyncThunk(
    'Catalog/fetchProductFilters',
    async(_,thunkAPI)=>{
        try {
            return await agent.Catalog.getFilters();
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error:error.data});
        }
    }
)

function initParams(){
    return{
        pageNumber:1,
        pageSize:6,
        orderBy:'name'
    }
}

export const CatalogSlicer=createSlice({
    name:'Catalog',
    initialState:productsAdapter.getInitialState<CatalogState>({
        productsLoaded:false,
        filtersLoaded:false,
        status:'idle',
        brands:[],
        types:[],
        productParams:initParams()
    }),
    reducers:{
        setProductParams:(state,action)=>{
            state.productsLoaded=false;
            state.productParams={...state.productParams,...action.payload};
        },
        resetProductParams:(state)=>{
            state.productParams=initParams();
        }
    },
    extraReducers:(builder=>{
        builder.addCase(fetchProductsAsync.pending,(state)=>{
            state.status='pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled,(state,action)=>{
            productsAdapter.setAll(state,action.payload);
            state.productsLoaded=true;
            state.status='idle';
        });
        builder.addCase(fetchProductsAsync.rejected,(state,action)=>{
            state.status='idle';
            console.log(action.payload);
        });
        builder.addCase(fetchProductAsync.pending,(state)=>{ 
            state.status='pendingFetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled,(state,action)=>{
            productsAdapter.upsertOne(state,action.payload);
            state.status='idle';
        });
        builder.addCase(fetchProductAsync.rejected,(state,action)=>{
            state.status='idle';
            console.log(action);
        });

        builder.addCase(fetchProductFilters.pending,(state)=>{ 
            state.status='pendingFetchFilters';
        });
        builder.addCase(fetchProductFilters.fulfilled,(state,action)=>{
            state.brands=action.payload.brands;
            state.types=action.payload.types;
            state.filtersLoaded=true;
            state.status='idle';
        });
        
        builder.addCase(fetchProductFilters.rejected,(state,action)=>{
            state.status='idle';
            console.log(action);
        });
    })
})

export const productSelectors=productsAdapter.getSelectors((state:RootState)=>state.catalog);

export const {setProductParams,resetProductParams}=CatalogSlicer.actions;