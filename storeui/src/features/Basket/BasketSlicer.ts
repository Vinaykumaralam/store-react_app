import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/Basket";
import agent from "../../app/api/agent";

interface BasketState{
    basket:Basket| null,
    status:string
}
const initialState:BasketState={
    basket:null,
    status:'idle'
}

export const addBasketItemAsync=createAsyncThunk<Basket,{productId:number,quantity?:number}>(
    'basket/addBasketItemAsync',
        async ({productId,quantity=1},thunkAPI)=>{
        try {
            return await agent.Basket.AddItemstoCart(productId,quantity);
        } catch (error:any) {
           return thunkAPI.rejectWithValue({error:error.data});   
        }
    }
)

export const removeBasketItemAsync=createAsyncThunk<void,{productId:number,quantity:number,name?:string}>(
    'basket/removeBasketItemAsync',
    async({productId,quantity},thunkAPI)=>{
        try {
            return await agent.Basket.RemoveItemFromCart(productId,quantity);
        } catch (error:any) {
           return thunkAPI.rejectWithValue({error:error.data});   
        }
    }
)

export const BasketSlicer=createSlice({
    name:"basket",
    initialState,
    reducers:{
        setBasket:(state,action)=>{
            state.basket=action.payload
        }
    },
    extraReducers:(builder=>{
        builder.addCase(addBasketItemAsync.pending,(state,action)=>{
            state.status='pending'+action.meta.arg.productId;
        });
        builder.addCase(addBasketItemAsync.fulfilled,(state,action)=>{
            state.basket=action.payload;
            state.status='idle';
       });
       builder.addCase(addBasketItemAsync.rejected,(state,action)=>{
         console.log(action.payload);
         state.status='idle';
       });
       builder.addCase(removeBasketItemAsync.pending,(state,action)=>{
         state.status='pendingRemoveItem'+action.meta.arg.productId+action.meta.arg.name;
       });
       builder.addCase(removeBasketItemAsync.fulfilled,(state,action)=>{
         const {productId,quantity}=action.meta.arg;
         const itemIndex=state.basket?.basketItems.findIndex(i=>i.id===productId);
         if(itemIndex===-1|| itemIndex===undefined)return;
         state.basket!.basketItems[itemIndex].quantity-=quantity;
         if(state.basket?.basketItems[itemIndex].quantity===0)state.basket.basketItems.splice(itemIndex,1);
         state.status='idle';
       });
        builder.addCase(removeBasketItemAsync.rejected,(state,action)=>{
         console.log(action.payload);
         state.status='idle';
        });
    })
}) 
export const {setBasket}=BasketSlicer.actions;