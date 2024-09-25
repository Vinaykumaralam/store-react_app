import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../Context/StoreContext";
import { UseAppSelector } from "../store/configureStore";

interface Props{
    DarkMode:boolean;
    handlleThemeChange:()=>void;
}
export default function Header({DarkMode,handlleThemeChange}:Props){

    const{basket}=UseAppSelector(state=>state.basket);
    const itemCount=basket?.basketItems.reduce((sum,item)=>(sum+item.quantity),0);

    const midLinks=[
        {title:'Catalog',path:'/catalog'},
        {title:'about',path:'/about'},
        {title:'Contact',path:'/contact'},
    ]
    const rightLinks=[
        {title:'Login',path:'/login'},
        {title:'Register',path:'/register'},
    ]

    const NavStyles={
        color:'inherit',typography:'h6',
        textDecoration:'none','&:hover':{color:'grey.500'},
        '&.active':{color:'text.secondary'}
    }
    return (
        <AppBar position='static' sx={{mb:4}}>
            <Toolbar sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <Box>
                <Typography component={NavLink} to={'/'} key={'/'} sx={NavStyles}>
                    REACT - STORE
                </Typography>
                <Switch checked={DarkMode} onChange={handlleThemeChange}></Switch>
                </Box>
                <Box>
                <List sx={{display:'flex'}}>
                    {midLinks.map(({title,path})=>
                    (
                        <ListItem
                        component={NavLink} to={path} key={path} sx={NavStyles}
                        >{title.toUpperCase()}</ListItem>
                    ))}
                </List>
                </Box>
                <Box sx={{display:'flex'}}>
                <IconButton component={Link} to='/basket' size='large' edge='start' color='inherit' sx={{mr:2}}>
                <Badge badgeContent={itemCount} color='secondary'>
                        <ShoppingCart/>
                    </Badge>                    
                </IconButton>
                <List sx={{display:'flex'}}>
                    {rightLinks.map(({title,path})=>
                    (
                        <ListItem
                        component={NavLink} to={path} key={path} sx={NavStyles}
                        >{title.toUpperCase()}</ListItem>
                    ))}
                </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}