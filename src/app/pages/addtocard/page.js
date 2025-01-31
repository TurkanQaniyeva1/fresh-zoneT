"use client"
import React, { useEffect, useState } from 'react'

const page = () => {
    const [card, setCard] = useState([]);

    useEffect(() => {
        const cartItem = JSON.parse(localStorage.getItem('cart')) || [];
        setCard(cartItem);
    }, []);

    const removeFromCart = (id) => {
        const updateCart = card.filter(item => item.id !== id);
        setCard(updateCart); 
        localStorage.setItem('cart', JSON.stringify(updateCart)); 
    };

    return (
        <div className='container flex flex-wrap gap-9 w-[70%] mx-auto justify-center'>
            {card && card.map((item) => (
                <div className='card w-[200px] relative' key={item.id}>
                    <img
                        className="w-full h-[120px] object-cover p-1 border border-[#a6a28d]"
                        src={item.image}
                        alt={item.title}
                    />
                    <h4 className="h-[30px] overflow-hidden text-[#333] font-normal text-base my-3">
                        {item.title}
                    </h4>
                    <p className="h-[30px] overflow-hidden font-lucida">{item.description}</p>
                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-2 right-2 bg-red-500 rounded-full py-1 px-2"
                    >
                        x
                    </button>
                </div>
            ))}
        </div>
    );
};

export default page;
