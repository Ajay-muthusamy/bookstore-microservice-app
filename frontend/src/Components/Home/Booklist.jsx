import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Booklist = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, setPriceRange] = useState("all");
  const [sortTrending, setSortTrending] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/bk/book-list`
      );
      setData(response.data);
      setFilteredData(response.data); 
    }
    fetchData();
  }, []);

  useEffect(() => {
    let books = [...data];

    
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      books = books.filter(
        (book) => Number(book.fixedPrice) >= min && Number(book.fixedPrice) <= max
      );
    }

  
    if (sortTrending) {
      books.sort((a, b) => (b.isTrending === true) - (a.isTrending === true));
    }

    setFilteredData(books);
  }, [priceRange, sortTrending, data]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(Number(rating));
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 inline-block ${
            i < fullStars ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.963c.3.92-.755 1.688-1.54 1.118l-3.39-2.463a1 1 0 00-1.175 0l-3.39 2.463c-.784.57-1.838-.197-1.54-1.118l1.287-3.963a1 1 0 00-.364-1.118L2.045 9.39c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.962z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center text-white">Book List</h1>

      
      <div className="flex flex-wrap justify-end gap-6 mb-10 bg-white rounded-md p-2">
        
           
        <select
          className="px-4 py-2 rounded-md border shadow-sm focus:outline-none"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="0-500">₹0 - ₹500</option>
          <option value="501-1000">₹501 - ₹1000</option>
          <option value="1001-2000">₹1001 - ₹2000</option>
        </select>

        
        <button
          onClick={() => setSortTrending(!sortTrending)}
          className={`px-4 py-2 rounded-md font-semibold shadow-md transition duration-300 ${
            sortTrending ? "bg-yellow-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          {sortTrending ? "Sorted by Trending" : "Sort by Trending"}
        </button>
         
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {filteredData.map((book, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col"
            onClick={() => navigate("/details", { state: { book } })}
          >
            <div className="relative mb-4 overflow-hidden rounded-md shadow-lg">
              <img
                src={book.image}
                alt={book.bookTitle}
                className="w-full h-52 object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <span
                className={`absolute top-3 left-3 ${
                  book.isSale ? "bg-red-600" : "bg-green-600"
                } text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg`}
              >
                {book.isSale ? "Sale out" : "SALE"}
              </span>

              {book.isTrending && (
                <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                  TRENDING
                </span>
              )}
            </div>

            <h2 className="text-xl font-semibold mb-2 text-gray-800 truncate">
              {book.bookTitle}
            </h2>

            <div className="flex items-center mb-3">
              {renderStars(book.rating)}
              <span className="ml-2 text-sm text-gray-600">({book.rating})</span>
            </div>

            <p className="text-gray-700 text-sm mb-4 line-clamp-3">
              {book.description}
            </p>

            <div className="mt-auto flex items-center space-x-4">
              <span className="text-indigo-600 font-bold text-lg">
                ₹{book.fixedPrice}
              </span>
              <span className="line-through text-gray-400">
                ₹{book.actualPrice}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-md transition duration-300">
          View All
        </button>
      </div>
    </div>
  );
};

export default Booklist;
