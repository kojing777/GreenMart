import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import Groceezy from "../../assets/Groceezy.png";
import { useAppContext } from "../../context/AppContext";
import React from "react";
import toast from "react-hot-toast";



const SellerLayout = () => {
const { axios,navigate } = useAppContext();



    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    const Logout = async() => {
       try {
        const {data} = await axios.get("/api/seller/logout");
        if (data.success) {
           toast.success(data.message);
           navigate('/')
        } else {
            toast.error(data.message);
        }
       } catch (error) {
        toast.error(error.message);
       }
    }

    return (
        <>
            <div className="flex sticky top-0 z-50 items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 h-20 bg-white ">
                <NavLink to="/">
                  <img src={Groceezy} alt="logo" className="cursor-pointer w-34 md:w-38" />
                </NavLink>
                <div className="flex items-center gap-5 text-gray-500">
                <p className="text-gray-600 transition-all duration-300 ease-in-out ">
  {(() => {
    const hour = new Date().getHours();
    if (hour < 5) return 'Late night shift, Admin ? ';
    if (hour < 12) return 'Good morning, Admin ! ';
    if (hour < 14) return 'Lunch time yet, Admin ? ';
    if (hour < 18) return 'Good afternoon, Admin ! ';
    if (hour < 22) return 'Good evening, Admin ! ';
    return 'Working late , Admin ? ';
  })()}
</p>
<button
            onClick={Logout}
            className="relative overflow-hidden border border-primary rounded-full text-sm px-6 py-1.5
                       text-primary font-medium transition-all duration-300
                       hover:bg-primary hover:text-white
                       focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
                       before:absolute before:inset-0 before:-left-full before:w-1/2 before:skew-x-[-20deg]
                       before:bg-white/30 before:transition-all before:duration-500
                       hover:before:left-full"
          >
            <span className="relative z-10 flex items-center justify-center">
              Logout
          
            </span>
          </button>
                </div>
            </div>
            <div className="flex">
            <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                {sidebarLinks.map((item) => (
                    <NavLink to={item.path} key={item.name} end={item.path ==="/seller"}
                        className={({isActive})=>`flex items-center py-3 px-4 gap-3 
                            ${ isActive ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                : "hover:bg-gray-100/90 border-white"
                            }`
                        }
                    >
                       <img src={item.icon} className="w-7 h-7" alt="" />
                        <p className="md:block hidden text-center">{item.name}</p>
                    </NavLink>
                ))}
            </div>
          <Outlet/>
            </div>
        </>
    );
};

export default SellerLayout;