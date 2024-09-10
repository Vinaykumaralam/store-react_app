import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
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
      <CssBaseline/>
      <Header DarkMode={DarkMode} handlleThemeChange={handlleThemeChange}/>
      <Container>
      <Outlet/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
