import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  
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

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline/>
      <Header DarkMode={DarkMode} handlleThemeChange={handlleThemeChange}/>
      <Container>
      <Outlet/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
