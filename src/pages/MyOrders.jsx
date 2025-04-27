import React, { useState, useEffect } from "react";
import { dummyOrders } from "../assets/assets";

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    
    const fetchMyOrders = async () => {
       setMyOrders(dummyOrders);
    };

    useEffect(() => {   
        fetchMyOrders();
    }, []);

    return (
        <div className="mt-16 pb-16">
            <div className="flex flex-col items-end w-max mb-8">
                <p className="text-2xl font-medium uppercase">My Orders</p>
                <div className="w-16 h-0.5 bg-primary rounded-full"></div>
            </div>
            
            {myOrders.length > 0 ? (
                myOrders.map((order, index) => ( 
                    <div key={index} className="border border-gray-300 rounded-lg p-4 mb-10 py-5 max-w-4xl">
                        <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
                            <span>OrderId: {order._id}</span>
                            <span>Payment: {order.paymentType}</span>
                            <span>TotalAmount: $ {order.amount}</span>
                        </p>
                        
                        {order.items.map((item, Index) => ( 
                            <div key={Index} className={`relative bg-white text-gray-500/70 ${order.items.length !== index + 1 &&  "border-b" }border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}>
                                <div className="flex gap-4 items-center">
                                    <div className="bg-primary/10 rounded-lg">
                                        <img 
                                            src={item.product.image[0]} 
                                            alt={item.product.name} 
                                            className="w-16 h-16 object-cover" 
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-xl font-medium text-gray-800">
                                            {item.product.name}
                                        </h2>
                                        <p className="text-gray-500">
                                            Category: {item.product.category}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                                    <p className="text-gray-500">
                                        Quantity: {item.quantity || "1"}
                                    </p>
                                    <p className="text-gray-500">
                                        Status: {order.status || "Processing"}
                                    </p>
                                    <p className="text-gray-500">
                                        Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                                    </p>
                                    <p className="text-gray-500">
                                        Price: ${item.product.offerPrice || item.product.price}
                                    </p>
                                    <p className="text-gray-500">
                                        Total: ${(item.product.offerPrice || item.product.price) * item.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No orders found</p>
            )}
        </div>
    );
};

export default MyOrders;