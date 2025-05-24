import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { MdCancel } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { CiLogin } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router";
import useStore from "../Store/store.js";
import axios from "axios";

const Navbar = () => {
  const { islogin } = useStore();
  const navigate = useNavigate();

  const [isSearch, setSearch] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/bk/book-list`
        );
        setData(response.data);
      } catch (err) {
        console.error("Failed to fetch book list", err);
      }
    }
    fetchData();
  }, []);

  const filteredBooks = searchQuery
    ? data.filter((book) =>
        book.bookTitle?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const fetchRecommendations = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const res = await fetch(
        `http://localhost:5001/recommend?title=${encodeURIComponent(
          searchQuery
        )}`
      );
      if (!res.ok) throw new Error("Failed to fetch recommendations");
      const data = await res.json();
      data.error ? setError(data.error) : setRecommendations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchRecommendations();
    }
  };

  const handleBookClick = (book) => {
    navigate("/details", { state: { book } });
    setSearch(false);
    setSearchQuery("");
    setRecommendations([]);
    setError(null);
  };

  const handleLogin = () => navigate("/login");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
    navigate("/");
  };

  const handleCart = () => {
    !islogin ? navigate("/login") : navigate("/cart");
  };

  return (
    <div className="font-extralight relative z-50">
      <div className="w-full h-10 bg-amber-300 mb-2"></div>

      <div className="flex items-center justify-between px-4 md:px-16 mb-2">
        <div className="flex items-center gap-4">
          <img
            src="https://ezequiel-santalla.github.io/bookstore/img/logo/logo.png"
            alt="logo"
            className="w-16 md:w-20"
            onClick={()=>navigate('/')}
          />
          <div className="md:hidden">
            <FiMenu
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="text-2xl cursor-pointer"
            />
          </div>
        </div>

        <ul className="hidden md:flex gap-6 lg:gap-8 text-sm lg:text-base">
          <li className="hover:text-blue-500 cursor-pointer" onClick={()=>navigate('/')}>Home</li>
          <li className="hover:text-blue-500 cursor-pointer"
          onClick={()=>navigate('/about')}>About Us</li>
          <li className="hover:text-blue-500 cursor-pointer"
          onClick={()=>navigate('/replacement')}>
            Return & Replacement
          </li>
          <li className="hover:text-blue-500 cursor-pointer" onClick={()=>navigate('/contactus')}>Contact Us</li>
          <li className="hover:text-blue-500 cursor-pointer" onClick={()=>navigate('/privacy')}>Privacy Policy</li>
        </ul>

        <div className="flex gap-4 text-2xl">
          <CiSearch
            onClick={() => setSearch(true)}
            className="cursor-pointer"
            title="Search books"
          />
          {islogin ? (
            <CiLogin
              onClick={handleLogout}
              className="cursor-pointer"
              title="Logout"
            />
          ) : (
            <RxAvatar
              onClick={handleLogin}
              className="cursor-pointer"
              title="Login"
            />
          )}
          <FaCartShopping onClick={handleCart} title="Cart" />
        </div>
      </div>

      {isSearch && (
        <div className="fixed inset-0 bg-white z-50 overflow-auto p-4 flex flex-col items-center">
          <div className="w-full max-w-md flex gap-2 mb-4 sticky top-0 bg-white z-50">
            <input
              type="text"
              placeholder="Search book by title..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button
              onClick={fetchRecommendations}
              className="px-4 py-2 bg-blue-900 text-white rounded-md"
            >
              Search
            </button>
            <MdCancel
              className="text-3xl cursor-pointer text-blue-950 mt-1"
              onClick={() => {
                setSearch(false);
                setSearchQuery("");
                setRecommendations([]);
                setError(null);
              }}
              title="Close search"
            />
          </div>

          {loading && <p>Loading recommendations...</p>}
          {error && <p className="text-red-600 font-semibold">{error}</p>}

          {!loading && !error && recommendations.length > 0 && (
            <ul className="w-full max-w-md space-y-2">
              {recommendations.map((book, idx) => (
                <li
                  key={idx}
                  className="border rounded-md p-2 flex gap-4 items-center cursor-pointer hover:bg-blue-50"
                  onClick={() => handleBookClick(book)}
                >
                  {book.image && (
                    <img
                      src={book.image}
                      alt={book.bookTitle || book.title}
                      className="w-16 h-24 object-cover rounded"
                    />
                  )}
                  <div>
                    <strong className="text-blue-700">
                      {book.bookTitle || book.title}
                    </strong>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {book.description || book.summary || "No description"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {!loading &&
            !error &&
            recommendations.length === 0 &&
            filteredBooks.length > 0 && (
              <>
                <p className="font-semibold text-gray-700 mb-2">
                  Local results for "{searchQuery}":
                </p>
                <ul className="w-full max-w-md space-y-2">
                  {filteredBooks.map((book, idx) => (
                    <li
                      key={idx}
                      className="border rounded-md p-2 flex gap-4 items-center cursor-pointer hover:bg-green-50"
                      onClick={() => handleBookClick(book)}
                    >
                      {book.image && (
                        <img
                          src={book.image}
                          alt={book.bookTitle || book.title}
                          className="w-16 h-24 object-cover rounded"
                        />
                      )}
                      <div>
                        <strong className="text-green-700">
                          {book.bookTitle || book.title}
                        </strong>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {book.description || book.summary || "No description"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}

          {!loading &&
            !error &&
            searchQuery &&
            filteredBooks.length === 0 &&
            recommendations.length === 0 && (
              <p className="text-gray-500 mt-4">
                No books found for "{searchQuery}"
              </p>
            )}
        </div>
      )}

      {isMenuOpen && (
        <div className="md:hidden fixed top-14 left-0 w-full bg-white shadow-lg z-40 p-4">
          <ul className="flex flex-col gap-4 text-base">
            <li className="hover:text-blue-500 cursor-pointer">Home</li>
            <li className="hover:text-blue-500 cursor-pointer">
              Product Categories
            </li>
            <li className="hover:text-blue-500 cursor-pointer">Bulk Purchase</li>
            <li className="hover:text-blue-500 cursor-pointer">About Us</li>
            <li className="hover:text-blue-500 cursor-pointer">
              Return & Replacement
            </li>
            <li className="hover:text-blue-500 cursor-pointer">Contact Us</li>
            <li className="hover:text-blue-500 cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-blue-500 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
