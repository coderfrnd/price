import { AppBar, Container, Toolbar, Typography,Select, MenuItem, makeStyles ,createTheme, ThemeProvider } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Cryptostate } from '../Context';

const useStyles = makeStyles(() => ({
       title:{
         flex : 1,
         color:"gold",
         fontFamily:"Montserrat",
         fontWeight:"bold",
         cursor:"pointer",
       }   
}))
function Header() {
  const classes = useStyles();
   const navi = useNavigate();
  const { currency , setcurrency} = Cryptostate();
         console.log(currency);

   const darkTheme = createTheme({
     palette : {
       primary : {
         main:"#fff"
       },
       type:"dark"
     }
   })
  return (
    <ThemeProvider theme={darkTheme}>
     <AppBar color='transparent' position = 'static'>
       <Container>
         <Toolbar>
           <Typography onClick={() => navi('/') }  className= {classes.title} variant = "h6" >Crypto Gen</Typography>
           <Select  
           variant='outlined'
           style={{
             width:100,
             height:40,
             marginRight:15,
              
           }}
           value = {currency} 
           onChange = {(e) => setcurrency(e.target.value)}
           
           
           >
           <MenuItem value = { "USD"} >USD</MenuItem>
           <MenuItem value = { "INR"} >INR</MenuItem>

           </Select>
         </Toolbar>
       </Container>

     </AppBar>

     </ThemeProvider>
    )
}

export default Header