import { Product } from "../../app/models/Product"

interface Props{
    products:Product[];
    addProducts:()=>void;
}

export default function Catalog({products,addProducts}:Props){
    return(
    <>
    <ul>
        {products.map(products=>(
          <li key={products.id}>
            {products.name}-{products.price}-{products.description}
          </li>
        ))}
    </ul>
    <button onClick={addProducts}>Add</button>
      </>
    )
}