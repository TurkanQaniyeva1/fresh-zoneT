"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  const getApi = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    setProducts(data);
  };

  useEffect(() => {
    getApi();
  }, []);

  const addToCart = (product) => {
    const existingCartItem = JSON.parse(localStorage.getItem(`cart-${product.id}`));

    if (!existingCartItem) {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        totalPrice: product.price,
      };
      localStorage.setItem(`cart-${product.id}`, JSON.stringify(cartItem));
      alert(`${product.title} sebete elave olundu!`);
    } else {
      alert(`${product.title} sebetde movcuddur!`);
    }
    
  };

  return (
    <>
      <section className="  py-10 bg-[url('https://templatemo.com/templates/templatemo_348_fresh_zone/images/templatemo_slider.jpg')] bg-cover bg-center">
        <div className="w-full lg:w-[60%] flex justify-center mx-auto gap-8 flex-wrap">
          <div className="bg-[url('https://templatemo.com/templates/templatemo_348_fresh_zone/images/slider-image-bg.png')] p-2 bg-cover bg-center w-full sm:w-[500px]">
            <Carousel />
          </div>
          <div className="mt-5 w-full sm:w-[350px]">
            <h2 className="text-[#363013] text-[30px] font-semibold">Sed malesuada luctus</h2>
            <p className="text-[#363013] my-4 font-medium text-[14px]">
              Duis dignissim tincidunt turpis eget pellentesque. Nulla consectetur accumsan facilisis. Sed vel interdum sapien.
            </p>
            <a href="#" title="Read more" className="more font-medium text-[15px] text-[#d46643]">Read more</a>
          </div>
        </div>
      </section>
      <section className="my-5">
        <div className="flex mx-auto gap-7 justify-center flex-wrap">
          <div className="w-full  sm:w-[460px]">
            <h2 className="text-2xl text-gray-800 font-normal font-serif">Recent Post: Phasellus lobortis faucibus</h2>
            <p className="italic text-xs mb-5">By Peter | May 16th, 2048 in 3D Animation</p>
            <img
              src="https://templatemo.com/templates/templatemo_348_fresh_zone/images/templatemo_image_02.jpg"
              alt="Example"
              className="float-left w-full sm:w-[209px] mr-4 mb-4 p-1 border border-[#a6a28d]"
            />
              <p className="text-sm text-[#d46643] italic mb-4">
                Morbi orci tellus, accumsan a posuere in, porta vitae velit. Fusce id augue ligula. Proin placerat nulla ac quam suscipit in eros laoreet.
              </p>
            <p className="">
                <em className="text-[#d46643] italic">Fresh Zone</em> is <em className="text-[#d46643] italic">website template</em> template designed by templatemo for your personal or business websites. Sed eu libero in risus porta porttitor id rhoncus dui. Maecenas porttitor nunc a nisi consectetur porttitor. In eget rutrum augue. Cras condimentum pellentesque justo luctus egestas. In a arcu magna. Ut nisi sapien, dapibus ut lacinia ut, cursus nec sapien. Nunc facilisis auctor metus, at mollis dictum sit amet. Validate <em className="text-[#d46643] italic">XHTML</em> &amp; <em className="text-[#d46643] italic">CSS</em>.
              </p>
          </div>
          <div className="w-full sm:w-[460px]">
            <h2 className="text-2xl mb-6 py-1 text-gray-800 font-normal font-serif">Recent Post: Integer hendrerit sapien</h2>
            <p className="text-[#d46643] italic"><em>Donec ultricies suscipit libero, sed dapibus purus pretium adipiscing.</em></p>
            <p className="my-5">Nunc venenatis nunc sed tellus dictum quis consectetur augue tristique.</p>
            <div className="flex flex-wrap gap-5 ml-3">
              <div>
                <ul className="templatemo_list">
                  <li className="flow flex gap-2 mt-2"> <img className="object-contain" src="https://templatemo.com/templates/templatemo_348_fresh_zone/images/list-tick.png" /> Vivamus semper ipsum</li>
                  <li className="flow flex gap-2 mt-2"> <img className="object-contain" src="https://templatemo.com/templates/templatemo_348_fresh_zone/images/list-tick.png" /> Ultrices rhoncus nunc</li>
                  <li className="flow flex gap-2 mt-2"> <img className="object-contain" src="https://templatemo.com/templates/templatemo_348_fresh_zone/images/list-tick.png" />Nunc id pulvinar ante</li>
                  <li className="flow flex gap-2 mt-2"> <img className="object-contain" src="https://templatemo.com/templates/templatemo_348_fresh_zone/images/list-tick.png" /> Dictum quis consectetur</li>
                </ul>
              </div>
              <div>
                <ul>
                  <li className="flow flex gap-2 mt-2"> <img className="object-contain" src="https://templatemo.com/templates/templatemo_348_fresh_zone/images/list-tick.png" /> Nunc id pulvinar ante</li>
                  <li className="flow flex gap-2 mt-2"> <img className="object-contain" src="https://templatemo.com/templates/templatemo_348_fresh_zone/images/list-tick.png" /> Venenatis nunc sed tellus</li>
                  <li className="flow flex gap-2 mt-2"> <img className="object-contain" src="https://templatemo.com/templates/templatemo_348_fresh_zone/images/list-tick.png" /> Venenatis nunc sed tellus</li>
                  <li className="flow flex gap-2 mt-2"> <img className="object-contain" src="https://templatemo.com/templates/templatemo_348_fresh_zone/images/list-tick.png" /> Curabitur facilisis metus</li>
                </ul>
              </div>
            </div>
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
      <h4 className="h-[30px] overflow-hidden text-[#333] font-normal text-base my-3">{product.title}</h4>
      <p className="h-[30px] overflow-hidden font-lucida">{product.description}</p>
      <div className="flex justify-between items-center mt-3">
        <button
          className="btn bg-[#d46643] text-white py-1 px-4 rounded-md hover:bg-[#b85b39] text-sm"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
        <Link
          href={`/pages/${product.id}`}
          className="btn bg-[#d46643] text-white py-1 px-4 rounded-md hover:bg-[#b85b39] text-sm"
        >
          Detail
        </Link>
      </div>
    </div>
  ))}

        </div>
      </section>
    </>
  );
}
