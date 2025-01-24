"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DetailPage({ params }) {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const getDetail = async () => {
    try {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${params.detail}`
      );
      setProduct(data);
      setTotalPrice(data.price); 
    } catch (error) {
      console.error( error);
    }
  };

  useEffect(() => {
    getDetail();
  }, [params.detail]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    setTotalPrice((prev) => prev + product.price);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    if (quantity > 1) {
      setTotalPrice((prev) => prev - product.price); 
    }
  };

  const addToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity,
      totalPrice,
    };

    const existingCartItem = JSON.parse(localStorage.getItem(`cart-${product.id}`));

    if (!existingCartItem) {
      localStorage.setItem(`cart-${product.id}`, JSON.stringify(cartItem));
      alert("Bu mehsul sebete elave olundu!");
    } else {
      alert("Bu mehsul sebetde movcuddur!");
    }
    
  };

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6">
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <img
          src={product.image || "https://via.placeholder.com/600"}
          alt={product.title || "Product Image"}
          className="w-[600px] h-[600px] object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-gray-800">{product.title || "Loading..."}</h1>
        <p className="text-gray-600 text-lg">{product.description || "Fetching details..."}</p>
        <p className="text-gray-600 text-sm font-medium border-b border-gray-300 pb-2">
          Category: <span className="text-indigo-600 font-semibold">{product.category || "N/A"}</span>
        </p>
        <p className="text-gray-600 text-sm font-medium border-b border-gray-300 pb-2">
          Rating:
          <span className="text-yellow-500 font-semibold">
            {product.rating?.rate ? `${product.rating.rate} / 5` : "N/A"}
          </span>
          ({product.rating?.count || "0"} reviews)
        </p>

        <p className="text-2xl font-semibold text-indigo-600">${totalPrice.toFixed(2)}</p>

        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={decreaseQuantity}
            className="w-10 font-bold text-[19px] h-10 flex justify-center items-center bg-gray-200 rounded-full text-gray-800 hover:bg-gray-300"
          >
            -
          </button>
          <span className="text-xl  font-medium text-gray-800">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="w-10 h-10 flex justify-center font-bold text-[18px] items-center bg-gray-200 rounded-full text-gray-800 hover:bg-gray-300"
          >
            +
          </button>
        </div>

        <button
          onClick={addToCart}
          className="mt-6 bg-indigo-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-indigo-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
