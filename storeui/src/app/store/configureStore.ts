import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/Contact/ContactSlicer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { BasketSlicer } from "../../features/Basket/BasketSlicer";
import Catalog from "../../features/Components/Catalog";
import { CatalogSlicer } from "../../features/Components/CatalogSlicer";

export const store=configureStore({
    reducer:{
        counter:counterSlice.reducer,
        basket:BasketSlicer.reducer,
        catalog:CatalogSlicer.reducer
    }
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;

export const UseAppDispatch=()=>useDispatch<AppDispatch>();
export const UseAppSelector:TypedUseSelectorHook<RootState>=useSelector;