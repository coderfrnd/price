import React, { createContext, useContext , useState,useEffect} from 'react'

const crypto = createContext()
function Context( {children}) {
    const [currency, setcurrency] = useState("INR");
    const [symbol, setsymbol] = useState("₹");
    useEffect(() => {
            if(currency==="INR") setsymbol("₹");
           else if(currency === "USD") setsymbol("$")
      }
    , [currency]);
    
  return (
    <crypto.Provider value={{currency,symbol,setcurrency}}>
         {children}

    </crypto.Provider>
  )
}

export default Context;

export const Cryptostate = () =>{
    return useContext(crypto);
}