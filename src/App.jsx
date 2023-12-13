import React from 'react';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import ItemDetailContainer from './components/ItemDetailContainer';
import {CartProvider} from './Contexts/Cartcontext';


const App = () => {
  return (
    
      
      <BrowserRouter>
       
        <CartProvider >
        <NavBar />
        <Routes>
          
          <Route exact path='/' element={<ItemListContainer greeting="Bienvenidos a Lado V- Store" />} />
          <Route exact path='/Cart' element={<Cart />} />
          <Route exact path='/producto/:id' element={<ItemDetailContainer />} />
          <Route exact path='/productos/:categoria' element={<ProductDetail />} />
        </Routes>
      
      </CartProvider>
    </BrowserRouter>
  ); 
};

export default App;