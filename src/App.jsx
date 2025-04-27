import React, { use } from 'react'
import Navbar from './Components/Navbar.jsx'
import { Routes ,Route , useLocation} from 'react-router-dom'
import Home from './pages/Home.jsx'
import { Toaster } from 'react-hot-toast'
import Footer from './Components/Footer.jsx'
import { useAppContext } from './Context/AppContext.jsx'
import Login from './Components/Login.jsx'
import AllProducts from './pages/AllProducts.jsx'
import ButtomBanner from './Components/ButtomBanner.jsx'
import ProductCategory from './pages/ProductCategory.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import AddAddress from './pages/AddAddress.jsx'
import MyOrders from './pages/MyOrders.jsx'



const App = () => {
  const isSellerPath = useLocation().pathname.includes('seller');
  const {showUserLogin} = useAppContext();
  return (
    <div>

     {isSellerPath ? null : <Navbar />}  
     {showUserLogin ? <Login /> : null}
    <Toaster />
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='ButtomBanner' element={<ButtomBanner />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/product/:category/:id' element={<ProductDetails />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrders />} />
        </Routes>
       
      </div>
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App