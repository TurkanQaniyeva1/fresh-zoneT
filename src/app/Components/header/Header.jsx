"use client";
import React, { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const updateCounts = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTotal = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    setCartCount(cartTotal);

    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistCount(wishlistItems.length);
  };

  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.push(product);
    localStorage.setItem("cart", JSON.stringify(cartItems));

    setCartCount(cartCount + 1);
  };

  const addToWishlist = (product) => {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlistItems.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems)); 

    setWishlistCount(wishlistCount + 1);
  };

  useEffect(() => {
    updateCounts();

    const handleStorageChange = () => {
      updateCounts();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-[url('https://templatemo.com/templates/templatemo_348_fresh_zone/images/templatemo_header.jpg')]">
      <div className="flex w-full md:w-[90%] h-[140px] items-center mx-auto justify-between md:justify-evenly">
        <div className="logo">
          <Link href="/">
            <img
              src="https://templatemo.com/templates/templatemo_348_fresh_zone/images/templatemo_logo.png"
              alt="Logo"
              className="cursor-pointer"
            />
          </Link>
        </div>

        <div className="md:hidden">
          <FaBars
            size={30}
            className="text-[#38362d] cursor-pointer"
            onClick={toggleMenu}
          />
        </div>

        <nav>
          <ul
            className={`flex md:space-x-6 ${menuOpen ? "flex-col" : "hidden"} md:flex md:flex-row`}
          >
            <li>
              <Link
                href="/"
                className="text-gray-800 hover:bg-[#bb3a33] hover:text-white transition-colors duration-100 px-3 py-1 text-sm"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-800 hover:bg-[#bb3a33] hover:text-white transition-colors duration-100 px-3 py-1 text-sm"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-800 hover:bg-[#bb3a33] hover:text-white transition-colors duration-100 px-3 py-1 text-sm"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-800 hover:bg-[#bb3a33] hover:text-white transition-colors duration-100 px-3 py-1 text-sm"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-800 hover:bg-[#bb3a33] hover:text-white transition-colors duration-100 px-3 py-1 text-sm"
              >
                Contact
              </Link>
            </li>
            <li className="relative">
              <Link href="/pages/addtocard" passHref>
                <FaCartShopping size={24} className="text-[#38362d]" />
                {cartCount > 0 && (
                  <span className="absolute top-[-10px] right-[-10px] bg-[#bb3a33] text-white text-xs rounded-full px-2 py-1">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="relative">
              <Link href="/pages/wishlist" passHref>
                <FaHeart size={24} className="text-[#38362d]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-[-10px] right-[-10px] bg-[#bb3a33] text-white text-xs rounded-full px-2 py-1">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="relative">
              <Link href="/pages/search" passHref>
                <IoSearch size={24} className="text-[#38362d]" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
