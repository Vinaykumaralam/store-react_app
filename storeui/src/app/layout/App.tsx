import { useEffect, useState } from "react";
import { Product } from "../models/Product";

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
      <h1>Re-Store</h1>
      <ul>
        {products.map(products=>(
          <li key={products.id}>
            {products.name}-{products.price}-{products.description}
          </li>
        ))}
      </ul>
      <button onClick={addProducts}>Add</button>
    </div>
  );
}

export default App;
