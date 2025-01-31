"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { BiSolidDetail } from "react-icons/bi";

const Carousel = () => {
  const images = [
    "https://templatemo.com/templates/templatemo_348_fresh_zone/images/slider/01.jpg",
    "https://templatemo.com/templates/templatemo_348_fresh_zone/images/slider/02.jpg",
    "https://templatemo.com/templates/templatemo_348_fresh_zone/images/slider/03.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("right");
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[360px] overflow-hidden relative">
      <div
        className="w-full h-full absolute bg-cover bg-center transition-all ease-in-out duration-700"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          animationDirection: direction === "right" ? "normal" : "reverse",
        }}
      />
    </div>
  );
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [alldata, setAlldata] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const getApi = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    setProducts(data);
  };

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setAlldata(savedCart);
    setWishlist(savedWishlist);
  }, []);

  const addToCart = (product) => {
    const result = alldata.some((item) => item.id === product.id);

    if (!result) {
      const upCart = [...alldata, product];
      setAlldata(upCart);
      localStorage.setItem("cart", JSON.stringify(upCart));
      alert("Cart added successfully");
    } else {
      alert("This item is already in your cart");
    }
  };

  const addToWish = (product) => {
    const result = wishlist.some((item) => item.id === product.id);

    if (!result) {
      const upWish = [...wishlist, product];
      setWishlist(upWish);
      localStorage.setItem("wishlist", JSON.stringify(upWish));
      alert("Wishlist updated successfully");
    } else {
      alert("This item is already in your wishlist");
    }
  };

  return (
    <>
      <section className="py-10 bg-[url('https://templatemo.com/templates/templatemo_348_fresh_zone/images/templatemo_slider.jpg')] bg-cover bg-center">
        <div className="w-full lg:w-[60%] flex justify-center mx-auto gap-8 flex-wrap">
          <div className="bg-[url('https://templatemo.com/templates/templatemo_348_fresh_zone/images/slider-image-bg.png')] p-2 bg-cover bg-center w-full sm:w-[500px]">
            <Carousel />
          </div>
          <div className="mt-5 w-full sm:w-[350px]">
            <h2 className="text-[#363013] text-[30px] font-semibold">Sed malesuada luctus</h2>
            <p className="text-[#363013] my-4 font-medium text-[14px]">
              Duis dignissim tincidunt turpis eget pellentesque. Nulla consectetur accumsan facilisis. Sed vel interdum sapien.
            </p>
            <a href="#" title="Read more" className="more font-medium text-[15px] text-[#d46643]">
              Read more
            </a>
          </div>
        </div>
      </section>
      <section className="my-9 py-3">
        <div className="container flex flex-wrap gap-9 w-[70%] mx-auto justify-center">
          {products &&
            products.map((product) => (
              <div className="card w-[200px]" key={product.id}>
                <img
                  className="w-full h-[120px] object-cover p-1 border border-[#a6a28d]"
                  src={product.image}
                  alt={product.title}
                />
                <h4 className="h-[30px] overflow-hidden text-[#333] font-normal text-base my-3">
                  {product.title}
                </h4>
                <p className="h-[30px] overflow-hidden font-lucida">{product.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <button
                    className="btn bg-[#d46643] text-white py-1 px-4 rounded-md hover:bg-[#b85b39] text-sm"
                    onClick={() => addToCart(product)}
                  >
                   < FaCartShopping/>
                  </button>
                  <button
                    className="btn bg-[#d46643] text-white py-1 px-4 rounded-md hover:bg-[#b85b39] text-sm"
                    onClick={() => addToWish(product)}
                  >
                    <FaRegHeart/>
                  </button>
                  <Link
                    href={`/pages/${product.id}`}
                    className="btn bg-[#d46643] text-white py-1 px-4 rounded-md hover:bg-[#b85b39] text-sm"
                  >
                  <BiSolidDetail/>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
