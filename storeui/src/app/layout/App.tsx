import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import Catalog from "../../features/Components/Catalog";
import { Typography } from "@mui/material";
function App() {
  const [products,setProducts]=useState<Product[]>([]);
  
  //T1

  useEffect(()=>{
    fetch('http://localhost:5000/GetProducts')
    .then(response=>response.json())
    .then(data=>setProducts(data))
  },[])

  function addProducts(){
    setProducts(prevState=>[...prevState,
      {name:'P'+(prevState.length+1),price:(prevState.length+1)*100,
      id:prevState.length+101,description:'Boots',pictureUrl:'http://picsum.photos/200'
      }
    ])
  }
  return (
    <div className="app">
      <Typography variant="h1">Re-Store</Typography>
      <Catalog products={products} addProducts={addProducts}/>
    </div>
  );
}

export default App;
