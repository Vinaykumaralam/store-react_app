import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/Home/HomePage";
import ContactPage from "../../features/Contact/Contact";
import AboutPage from "../../features/About/About";
import ProductDetail from "../../features/Components/ProductDetail";
import Catalog from "../../features/Components/Catalog";

export const router =createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {path:'',element:<HomePage/>},
            {path:'contact',element:<ContactPage/>},
            {path:'about',element:<AboutPage/>},
            {path:'catalog',element:<Catalog/>},
            {path:'catalog/:id',element:<ProductDetail/>},
        ]
    }
])