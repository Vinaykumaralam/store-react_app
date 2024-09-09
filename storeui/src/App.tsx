import { useEffect, useState } from "react";

function App() {
  const [products,setProducts]=useState([
    {name:'P1',price:10.00},
    {name:'P2',price:20.00},
    {name:'P3',price:30.00},
    {name:'P4',price:40.00},
    {name:'P5',price:50.00}
  ]);
  
  useEffect(()=>{
    fetch('http://localhost:5000/GetProducts')
    .then(response=>response.json())
    .then(data=>setProducts(data))
  },[])

  function addProducts(){
    setProducts(prevState=>[...prevState,{name:'P'+(prevState.length+1),price:(prevState.length+1)*100}])
  }
  return (
    <div className="app">
      <h1>Re-Store</h1>
      <ul>
        {products.map((item,index)=>(
          <li key={index}>
            {item.name}-{item.price}
          </li>
        ))}
      </ul>
      <button onClick={addProducts}>Add</button>
    </div>
  );
}

export default App;
