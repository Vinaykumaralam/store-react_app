import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/Basket";

interface StoreContextValue{
    basket:Basket | null,
    setBasket :(basket:Basket)=>void,
    removeItem :(productId:number,quantity:number)=>void;
}

export const StoreContext=createContext<StoreContextValue|undefined>(undefined);

export function useStoreContext(){
    const context=useContext(StoreContext);

    if(context===undefined){
        throw Error('We are inside provider');
    }
    return context;
}

export function StoreProvider({children}:PropsWithChildren<any>){
    const [basket,setBasket]=useState<Basket|null>(null);

    function removeItem(productId:number,quantity:number){
        if(!basket)return;
        const items=[...basket.basketItems];
        const itemIndex=items.findIndex(i=>i.id===productId);
        if(itemIndex>=0){
            items[itemIndex].quantity-=quantity;
            if(items[itemIndex].quantity===0){ 
                items.splice(itemIndex,1);
                window.location.reload();
            }
            
            setBasket(prevState=>{
                return {...prevState!,items:[...items]}
            })
        }
    }
    return(
        <StoreContext.Provider value={{basket,setBasket,removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}