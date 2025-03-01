import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props{
    items:string[];
    checked?:string[];
    onChange:(items:string[])=>void;
}
export function CheckedItems({items,checked,onChange}:Props){

    const [checkedItems,setCheckedItems]=useState(checked || []);
    function handleChecked(value:string){
        const currentIndex=checkedItems.findIndex(items=>items===value);
        let newChecked:string[]=[];
        if(currentIndex===-1) newChecked=[...checkedItems,value];
        else newChecked=checkedItems.filter(items=>items!==value);
        setCheckedItems(newChecked);
        onChange(newChecked);
    }
    return(
        <>
          <FormGroup>
            {items.map(item=>(
              <FormControlLabel label={item} 
                                key={item} 
                                control={<Checkbox checked={checkedItems.indexOf(item)!==-1}
                                                    onClick={()=>handleChecked(item)}
                                        />}
               />
            ))}
          </FormGroup>
          </>
    )
}