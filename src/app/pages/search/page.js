"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === 'a-z') {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === 'z-a') {
      return b.title.localeCompare(a.title);
    } else if (sortOrder === 'ucuzdan-bahaliya') {
      return a.price - b.price;
    } else if (sortOrder === 'bahalidan-ucuza') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Search Page</h1>
      <div className="flex flex-col items-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          onClick={() => handleSort('a-z')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          A-Z
        </button>
        <button
          onClick={() => handleSort('z-a')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Z-A
        </button>
        <button
          onClick={() => handleSort('ucuzdan-bahaliya')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
         Ucuzdan-bahaliya
        </button>
        <button
          onClick={() => handleSort('bahalidan-ucuza')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Bahalidan-ucuza
        </button>
      </div>
      <div className="container flex flex-wrap gap-6 w-full max-w-6xl mx-auto justify-center">
        {sortedProducts && sortedProducts.map((product) => (
          <div className="card w-[200px] shadow-lg rounded-lg overflow-hidden" key={product.id}>
            <img
              className="w-full h-[120px] object-cover p-1 border border-[#a6a28d]"
              src={product.image}
              alt={product.title}
            />
            <h4 className="h-[30px] overflow-hidden text-[#333] font-normal text-base my-3 px-2">
              {product.title}
            </h4>
            <p className="h-[30px] overflow-hidden font-lucida px-2 pb-5">{product.description}</p>
            <p>
                <strong className='h-[30px] overflow-hidden font-lucida px-2 my-4 '>Price: ${product.price}</strong>
  
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}