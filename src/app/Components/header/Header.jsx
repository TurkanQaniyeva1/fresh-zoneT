"use client";
import React, { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import Link from "next/link";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); 

  const getCartCount = () => {
    let totalQuantity = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const cartItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (cartItem && cartItem.quantity) {
        totalQuantity += cartItem.quantity;
      }
    }

    setCartCount(totalQuantity);
  };

  useEffect(() => {
    getCartCount();
    const interval = setInterval(getCartCount, 1000); 

    return () => clearInterval(interval); 
  }, []); 

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
              <Link href="/cart" passHref>
                <FaCartShopping size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-[-10px] right-[-10px] bg-[#bb3a33] text-white text-xs rounded-full px-1 py-1">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;


