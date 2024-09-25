import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/Basket";

interface BasketState{
    basket:Basket| null
}
const initialState:BasketState={
    basket:null
}
export const BasketSlicer=createSlice({
    name:"basket",
    initialState,
    reducers:{
        setBasket:(state,action)=>{
            state.basket=action.payload
        },
        removeItem:(state,action)=>{
            const {productId,quantity}=action.payload;
            const itemIndex=state.basket?.basketItems.findIndex(i=>i.id===productId);
            if(itemIndex===-1|| itemIndex===undefined)return;
            state.basket!.basketItems[itemIndex].quantity-=quantity;
            if(state.basket?.basketItems[itemIndex].quantity===0)state.basket.basketItems.splice(itemIndex,1);
        }
    }
}) 
export const {setBasket,removeItem}=BasketSlicer.actions;