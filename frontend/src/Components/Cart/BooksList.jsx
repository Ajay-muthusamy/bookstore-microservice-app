import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useStore from "../Store/store";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const BooksList = () => {
  const navigate = useNavigate();
  const { islogin } = useStore();
  const location = useLocation();
  const { book } = location.state || {};

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const loginUserId = localStorage.getItem("userId");
    if (loginUserId) {
      setUserId(loginUserId);
    }
  }, []);

  const handleCart = async () => {
    if (!islogin) {
      return navigate("/login");
    }

    try {
      const formdata = {
        bookId: book._id,
        userId: userId,
        bookTitle: book.bookTitle,
        image: book.image,
        fixedPrice: book.fixedPrice,
        actualPrice: book.actualPrice,
        rating: book.rating,
        isSale: book.isSale,
        isTrending: book.isTrending,
        description: book.description,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_SPRING_API_URL}/api/cart/add`,
        formdata
      );
      console.log("Posted successfully", response);
      toast.success("Book added to the cart");
    } catch (error) {
      console.error("Error adding book to cart:", error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message?.toLowerCase().includes("already")
      ) {
        toast.error("Book already in the cart");
      } else {
        toast.error("Failed to add book. Please try again.");
      }
    }
  };

  if (!book) {
    return (
      <div className="text-center text-xl font-semibold py-10">
        No book selected.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-12 py-8 flex flex-col md:flex-row items-center md:items-start justify-center gap-12 md:gap-28">
      <Toaster />
      <div>
        <img
          src={book.image}
          alt={book.bookTitle}
          className="w-64 md:w-80 shadow-lg mx-auto"
        />
      </div>

      <div className="space-y-4 max-w-md w-full px-2 md:px-0">
        <h1 className="text-2xl md:text-3xl font-light">{book.bookTitle}</h1>

        {book.isTrending && (
          <span className="text-2xl md:text-4xl font-semibold text-gray-700">
            #Trending
          </span>
        )}

        <div className="text-lg md:text-2xl space-x-3">
          <span className="line-through text-gray-400">
            Rs. {book.actualPrice}
          </span>
          <span className="text-green-600 font-bold">
            Rs. {book.fixedPrice}
          </span>
          {book.isSale ? (
            <span className="ml-2 text-xs md:text-sm text-white bg-gray-700 px-2 py-1 rounded">
              Sold out
            </span>
          ) : (
            <span className="ml-2 text-xs md:text-sm text-white bg-green-500 px-2 py-1 rounded">
              Sale
            </span>
          )}
        </div>

        <p className="text-gray-700">{book.description}</p>

        <div className="gap-4 mt-4">
          <button
            onClick={handleCart}
            className={`w-full sm:w-auto md:px-40 py-2 border rounded transition ${
              book.isSale
                ? "border-gray-400 text-gray-400 cursor-not-allowed bg-gray-100"
                : "border-pink-600 text-pink-600 hover:bg-pink-50"
            }`}
            disabled={book.isSale}
          >
            Add to Cart
          </button>

          <br />

          <button
            className={`w-full sm:w-auto md:px-[23vh] mt-2 py-2 border rounded transition ${
              book.isSale
                ? "border-gray-400 text-gray-400 cursor-not-allowed bg-gray-100"
                : "border-pink-600 hover:bg-pink-50 hover:text-black bg-pink-600 text-white"
            }`}
          >
            Buy Now
          </button>
        </div>

        <div className="mt-6 p-4 border border-gray-300 rounded text-center">
          <p className="font-bold text-base md:text-lg">
            Hurry up! <span className="text-black">12 : 23 : 29</span>
          </p>
          <p className="text-sm text-gray-500">Sale ends in: Hrs Mins Secs</p>
        </div>
      </div>
    </div>
  );
};

export default BooksList;
