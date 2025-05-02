import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
   try {
    event.preventDefault();
    const {data} = await axios.post("/api/seller/login", {
      email,
      password,
    });
    if (data.success) {
      setIsSeller(true);
      navigate("/seller");
    } else {
      toast.error(data.message);
    }
   } catch (error) {
    toast.error(error.message);
   }

  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="flex flex-col gap-6 m-auto items-start p-8 py-12 min-w-80 sm:min-w-96 shadow-xl rounded-xl border border-gray-200 bg-white hover:shadow-2xl transition-shadow duration-300">
          <p className="text-3xl font-medium m-auto text-gray-800">
            <span className="text-primary">Seller</span> Login
          </p>
          
          <div className="w-full space-y-1">
            <p className="text-gray-700 font-medium">Email</p>
            <input 
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="border border-gray-200 rounded-lg w-full p-3 mt-1 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 hover:border-gray-300"
              required
            />
          </div>
          
          <div className="w-full space-y-1">
            <p className="text-gray-700 font-medium">Password</p>
            <input 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="border border-gray-200 rounded-lg w-full p-3 mt-1 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 hover:border-gray-300"
              required
            />
            <div className="text-right mt-1">
              <a 
                href="#" 
                className="text-sm text-gray-500 hover:text-primary hover:underline transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="bg-primary text-white w-full py-3 rounded-lg font-medium hover:bg-primary-dark hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Login
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;