import {BrowserRouter as Router ,Routes,  Route} from 'react-router-dom'
import Header from './Component/Header';
import './App.css';
import Home from './Pages/Home';
import CoinPage from './CoinPage';
import {makeStyles} from "@material-ui/core"

function App() {
      const useStyles = makeStyles(() => ({
        App:{
          backgroundColor: "#14161a",
          color:"white",
          minHeight:"100vh",

             
        },
      }));
      const classes = useStyles();
  return (
    <Router>
      <div className= {classes.App}>
      <Header/>
      <Routes>
        <Route path='/' exact element = {<Home/>} />
        <Route path='/coins/:id' exact element = {<CoinPage/>} />

      </Routes>
      </div>

    </Router>
    

 
    );
}

export default App;
