"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
export default function DetailPage({ params }) {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    getDetail();
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);
  const getDetail = async () => {
    try {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${params.detail}`
      );
      setProduct(data);
      setTotalPrice(data.price);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    setTotalPrice((prev) => prev + product.price);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      setTotalPrice((prev) => prev - product.price);
    }
  };

  const addToCart = () => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    let updatedCart;
    if (existingItemIndex !== -1) {
      updatedCart = cart.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + quantity, totalPrice: item.totalPrice + totalPrice }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity, totalPrice }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Bu məhsul səbətə əlavə olundu!");
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
        <h1 className="text-3xl font-bold text-gray-800">
          {product.title || "Loading..."}
        </h1>
        <p className="text-gray-600 text-lg">{product.description || "Fetching details..."}</p>
        <p className="text-gray-600 text-sm font-medium border-b border-gray-300 pb-2">
          Category: <span className="text-indigo-600 font-semibold">{product.category || "N/A"}</span>
        </p>
        <p className="text-gray-600 text-sm font-medium border-b border-gray-300 pb-2">
          Price: <span className="text-green-600 font-semibold">${product.price}</span>
        </p>

        <div className="flex items-center gap-4">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={decreaseQuantity}>-</button>
          <span className="text-xl font-semibold">{quantity}</span>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={increaseQuantity}>+</button>
        </div>

        <button
          className="mt-6 bg-indigo-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-indigo-700"
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
