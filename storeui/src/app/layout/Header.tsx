import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props{
    DarkMode:boolean;
    handlleThemeChange:()=>void;
}
export default function Header({DarkMode,handlleThemeChange}:Props){

    return (
        <AppBar position='static' sx={{mb:4}}>
            <Toolbar>
                <Typography variant='h6'>React-Store</Typography>
                <Switch checked={DarkMode} onChange={handlleThemeChange}></Switch>
            </Toolbar>
            
        </AppBar>
    )
}