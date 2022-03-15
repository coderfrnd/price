import { ThemeProvider,createTheme, Container, Typography, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody, makeStyles } from '@material-ui/core';
import axios from 'axios';
import {React,useState,useEffect} from 'react'
import { Classnames } from 'react-alice-carousel';
import { CoinList } from '../Config/api';
import { Cryptostate } from '../Context';
import { useNavigate } from 'react-router-dom';
import {Pagination} from '@material-ui/lab'


const CoinsTable = () => {
     const [Coins, setCoins] = useState([])
     const [loading, setloading] = useState(false);
      const [Search, setSearch] = useState("")
     const {currency,symbol} = Cryptostate();
     const [page, setpage] = useState(1)
     const fetchCoins = async ()=>{
         setloading(true);
         const { data } = await axios.get(CoinList(currency));
         setCoins(data);
         setloading(false);
     };
     function numberWithCommas(x){
        return ( x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","));
      }
     useEffect(() => {
      fetchCoins();
     }, [currency]);
     const darkTheme = createTheme({
         palette:{
             primary:{
                 main:"#fff",
             },
             type:"dark",
         },
     });
     const handelSearch =()=>{
         return Coins.filter(
             (coin) => 
             coin.name.toLowerCase().includes(Search) || 
             coin.symbol.toLowerCase().includes(Search)
         )
     };
     const useStyles = makeStyles(() => ({
         row:{
             backgroundColor:"#16171a",
             cursor:"pointer",
             "&:hover" :{
                 backgroundColor:"#131111",
             },
             fontFamily:"Montserrat",
         },
         pagination:{
             "& .MuiPaginationItem-root":{
                 color:"gold",
             },
         },

     }));
     const Classes = useStyles();
      const kavi = useNavigate();
    return (
    <ThemeProvider theme={darkTheme}>
       <Container style={{textAlign:"center"}}>
         <Typography variant="h4"
         style={{margin:18,fontFamily:"Montserrat",
         color:"white"
        }}
            >
            
             Crypto price by market cap
         </Typography >
       <TextField label="Search Crypto Currency " variant="outlined" 
       style={{marginBottom:20,width:"100%",color:"white" }}
       onChange={(e)=>setSearch(
          e.target.value
       )}
       > </TextField>
        <TableContainer>
            {
                loading ? (
                    <LinearProgress style={{backgroundColor:"gold"}}/>
                ):(
                    <Table>
                        <TableHead style={{backgroundColor:"#EEBC1D"}}>
                     <TableRow>
                         {["Coin","Price","24h Change","Market Cap"].map((head)=>(
                             <TableCell 
                             style={{
                                 color:"black",
                                 fontWeight:"700",
                                 fontFamily:"Montserrat"
                             }}
                             key ={head}
                             align={head === "Coin" ? "":"right"}
                             
                             >
                                 {head}

                             </TableCell>
                         ))}
                     </TableRow>
                        </TableHead>
                        <TableBody>{handelSearch().slice((page-1)*10,(page-1)*10+10).map((row) => {
                            const profit = row.price_change_percentage_24h > 0;
                            return(
                                <TableRow 
                               onCLick={ () =>
                                kavi(`/coins/${row.id}`)}
                               className = {Classes.row}
                                   key={row.name}

                               
                            //     
                            // 
                               
                               > 
                               <TableCell component='th' scope ='row'
                               style={{
                                   display:"flex",
                                   gap:15,
                               }}
                               
                               >
                                   <img 
                                   src={row?.image}
                                   alt={row.name}
                                   height="50"
                                   style={{marginBottom:10}}
                                   
                                   />
                                   <div style={{display:"flex",flexDirection:"column"}}>
                                <span 
                                style={{
                                    textTransform:"uppercase",
                                    fontSize:"22",
                                 }}
                                >
                              {row.symbol}
                                </span>
                                <span style={{color:"darkgray"}}>{row.name}</span>
                                   </div>

                               </TableCell >
                               <TableCell align='right'>
                                   {symbol}{""}
                                   {numberWithCommas(row.current_price.toFixed(2))}
                               </TableCell>
                               <TableCell align='right'
                               style={{
                                   color:profit > 0? "rgb(14,203,129)":"red",fontWeight:500,
                               }}
                               
                               >
                                   {profit && "+"}
                                   {row.price_change_percentage_24h.toFixed(2)}%
                                   
                               </TableCell>
                               <TableCell align='right'>
                                   {symbol}{""}
                                   {numberWithCommas(row.market_cap.toString().slice(0,-6))} Million 
                               </TableCell>
                            
                               
                                </TableRow>
                            )
                        })}</TableBody>
                    </Table>
                )
           }
        </TableContainer>
      <Pagination
        style={{
            padding:20,
            width:"100%",
            display:"flex",
            justifyContent:"center",
      }}
        classes={{ul:Classes.pagination}}
       count={(handelSearch()?.length/10).toFixed(0)}
       onChange={(_,value) => {
           setpage(value);
           window.scroll(0,450);
       }}
      
      
      />
         
         
       </Container>
    </ThemeProvider>

  )
}

export default CoinsTable