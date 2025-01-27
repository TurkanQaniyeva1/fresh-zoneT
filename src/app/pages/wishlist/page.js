"use client"
import React, { useEffect, useState } from 'react'

const page = () => {

    const [wish, setWish] = useState([]);

    useEffect(() => {
        const wishItem = JSON.parse(localStorage.getItem('cart'));
        setWish(wishItem)
    }, [])
    return (
        <div>
            {wish && wish.map((item) => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.price}</p>
                </div>
            ))}
        </div>
    )
}

export default page
