import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Home from "./components/Home/Home";
import { useEffect } from 'react';
import WebFont from 'webfontloader';
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Product/Products.js'
import Search from "./components/Product/Search.js"

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    });
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path='/product/:id' Component={ProductDetails} />
        <Route exact path='/products' Component={Products} />
        <Route  path='/products/:keyword' Component={Products} />
        <Route exact path='/search' Component={Search} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
