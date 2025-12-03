import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Order from './components/Order'
import Cart from './components/cart.jsx'
import { useState, useEffect } from 'react'


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/order" element={<Order />}/>
        <Route path="/" element={<Cart />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
