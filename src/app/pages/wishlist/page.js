"use client"
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [wish, setWish] = useState([]);

  useEffect(() => {
    const wishItem = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWish(wishItem);
  }, []);
  const removeFromWishlist = (id) => {
    const updatedWishlist = wish.filter(item => item.id !== id); 
    setWish(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); 
  };

  return (
    <div className='container flex flex-wrap  gap-9 w-[70%] mx-auto justify-center'>
      {wish?.map((item) => (
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
            onClick={() => removeFromWishlist(item.id)}
            className="absolute  top-2 right-2 bg-red-500 rounded-full py-1 px-2"
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}

export default Page;

