import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/Home/HomePage";
import ContactPage from "../../features/Contact/Contact";
import AboutPage from "../../features/About/About";
import ProductDetail from "../../features/Components/ProductDetail";
import Catalog from "../../features/Components/Catalog";
import ServerError from "../error/ServerError";
import NotFoundPage from "../error/NotFoundPage";
import BasketPage from "../../features/Basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";

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
            {path:'server-error',element:<ServerError/>},
            {path:'/not-found',element:<NotFoundPage/>},
            {path:'/basket',element:<BasketPage/>},
            {path:'/checkout',element:<CheckoutPage/>},
            {path:'*',element:<Navigate replace to='/not-found'/>}
        ]
    }
])