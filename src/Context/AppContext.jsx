import React from 'react';
import { createContext , useContext , useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyProducts } from '../assets/assets';
import { toast } from 'react-hot-toast';


export const AppContext = createContext();


export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;


    const navigate= useNavigate();
    const [user, setUser] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);


    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});
//fetch products from api
    const fetchProducts = async () => {
        setProducts(dummyProducts);
    }

    //add product ot cart
    const addToCart = (itemId) => {
       let cartData = structuredClone(cartItems);
       if(cartData[itemId]){
            cartData[itemId] += 1;
    }else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData)
        toast.success("Product added to cart")
    }

    //update cart item count
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Product Cart Updated")
    }

    //remove product from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
       if (cartData[itemId]) {
             cartData[itemId] -= 1;
        if(cartData[itemId] === 0){
            delete cartData[itemId];
        }
        
       }
        toast.success("Product removed from cart")
        setCartItems(cartData);
    }


    useEffect (() => {
        fetchProducts();
    }
    , []);
    const value = { navigate, user, setUser, isSeller, setIsSeller , showUserLogin, setShowUserLogin , products, setProducts ,currency , cartItems, setCartItems, addToCart ,updateCartItem, removeFromCart, searchQuery, setSearchQuery };
    
    return  (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}; 
 
export const useAppContext = () => {
   
    return useContext(AppContext);
}

