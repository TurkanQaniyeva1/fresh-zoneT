"use client"
import React, { useEffect, useState } from 'react'

const page = () => {

    const [card, setCard] = useState([]);

    useEffect(() => {
        const cartItem = JSON.parse(localStorage.getItem('cart'));
        setCard(cartItem)
    }, [])
    return (
        <div className='container flex flex-wrap gap-9 w-[70%] mx-auto justify-center'>
            {card && card.map((item) => (
                <div className='card w-[200px]' key={item.id} >
                    <img
                        className="w-full h-[120px] object-cover p-1 border border-[#a6a28d]"
                        src={item.image}
                        alt={item.title}
                    />
            <h4 className="h-[30px] overflow-hidden text-[#333] font-normal text-base my-3">
                {item.title}
            </h4>
            <p className="h-[30px] overflow-hidden font-lucida">{item.description}</p>
                </div>
                
            ))}
        </div>
    )
}

export default page

