import { useState } from 'react'
import Navbar from './components/header/Navbar.jsx';
import { Routes, Route } from 'react-router-dom';
import Products from './components/body/Products.jsx';
import AddProduct from './components/body/AddProduct.jsx';
import Home from './components/body/Home.jsx';
import Carousel from './components/body/small_components/Carousel.jsx';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Carousel />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/list" element={<Products />} />
        <Route path="/products/list" element={<Products />} />
        <Route path="/products/add" element={<AddProduct />} />
      </Routes>
    </div>
  )
}

export default App
