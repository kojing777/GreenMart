import React, { use } from 'react'
import Navbar from './Components/Navbar.jsx'
import { Routes ,Route , useLocation} from 'react-router-dom'
import Home from './pages/Home.jsx'
import { Toaster } from 'react-hot-toast'
import Footer from './Components/Footer.jsx'
import { useAppContext } from './Context/AppContext.jsx'
import Login from './Components/Login.jsx'
import AllProducts from './pages/AllProducts.jsx'
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
          <Route path='products' element={<AllProducts />} />
        </Routes>
       
      </div>
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App