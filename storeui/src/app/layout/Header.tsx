import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

interface Props{
    DarkMode:boolean;
    handlleThemeChange:()=>void;
}
export default function Header({DarkMode,handlleThemeChange}:Props){

    const midLinks=[
        {title:'Catalog',path:'/catalog'},
        {title:'about',path:'/about'},
        {title:'Contact',path:'/contact'},
    ]
    const rightLinks=[
        {title:'Login',path:'/login'},
        {title:'Register',path:'/register'},
    ]

    return (
        <AppBar position='static' sx={{mb:4}}>
            <Toolbar>
                <Typography component={NavLink} to={'/'} key={'/'} sx={{color:'inherit',typography:'h6',textDecoration:'none'}}>
                    REACT - STORE
                </Typography>
                <Switch checked={DarkMode} onChange={handlleThemeChange}></Switch>
                <List sx={{display:'flex'}}>
                    {midLinks.map(({title,path})=>
                    (
                        <ListItem
                        component={NavLink} to={path} key={path} sx={{color:'inherit',typography:'h6'}}
                        >{title.toUpperCase()}</ListItem>
                    ))}
                </List>
                <IconButton size='large' edge='start' color='inherit' sx={{mr:2}}>
                    <Badge badgeContent='4' color='secondary'>
                        <ShoppingCart/>
                    </Badge>
                </IconButton>
                <List sx={{display:'flex'}}>
                    {rightLinks.map(({title,path})=>
                    (
                        <ListItem
                        component={NavLink} to={path} key={path} sx={{color:'inherit',typography:'h6'}}
                        >{title.toUpperCase()}</ListItem>
                    ))}
                </List>
            </Toolbar>
        </AppBar>
    )
}