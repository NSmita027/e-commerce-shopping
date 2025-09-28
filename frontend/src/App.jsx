import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import ProtectedRoute from './components/ProtectedRoute';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import SearchPage from './pages/SearchPage';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <>
      <Navbar/>
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/product/:id' element={<ProductPage/>}/>
          <Route path='/cart' element={<CartPage/>}></Route>
          <Route path='/checkout' element={<CheckoutPage/>}></Route>
          <Route path='/orders' element={<OrdersPage/>}></Route>
          <Route path='/search' element={<SearchPage/>}></Route>
          <Route path='/admin' element={<AdminDashboard/>}></Route>

           {/* protected example */}

           {/* <Route path='/checkout' element={<ProtectedRoute><div>Checkout page (TBD)</div></ProtectedRoute>} /> */}
        </Routes>

      </main>
      
    </>
  );
}

export default App
