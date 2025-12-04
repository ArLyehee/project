import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Order from './components/Order'
import Cart from './components/Cart'
import Done from './components/Done'
import { useState, useEffect } from 'react'


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/order" element={<Order />}/>
        <Route path="/" element={<Cart />}/>
        <Route path="/done" element={<Done />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
