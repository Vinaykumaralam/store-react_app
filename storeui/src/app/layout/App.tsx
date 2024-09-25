import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from "../utils/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { UseAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/Basket/BasketSlicer";

function App() {
  const dispatch=UseAppDispatch();
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const buyerId=getCookie('buyerId');
    if(buyerId){
      agent.Basket.getBasket()
      .then(basket=>dispatch(setBasket(basket)))
      .catch(e=>console.log(e))
      .finally(()=>setLoading(false));
    }else{
      setLoading(false);
    }
  },[dispatch]);

  const [DarkMode,setDarkMode]=useState(false);
  const paletteType=DarkMode ? 'dark':'light';
  const theme=createTheme({
    palette:{
      mode:paletteType,
      background:{
      default:paletteType==='light' ? '#eaeaea':'#121212'}
    }
  });

  function handlleThemeChange(){
    setDarkMode(!DarkMode);
  }

  if(loading) return <LoadingComponent message="Loading ..."></LoadingComponent>
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline/>
      <Header DarkMode={DarkMode}  handlleThemeChange={handlleThemeChange}/>
      <Container>
      <Outlet/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
