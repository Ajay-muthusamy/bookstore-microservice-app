import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Cart = () => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    mobile: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const loginUserId = localStorage.getItem("userId");
    if (loginUserId) setUserId(loginUserId);
  }, []);

  useEffect(() => {
    if (userId) fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SPRING_API_URL}/api/cart/user/${userId}`
      );
      const updatedData = response.data.map((item) => ({
        ...item,
        quantity: 1,
      }));
      setData(updatedData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_SPRING_API_URL
        }/api/cart/delete?userId=${userId}&bookId=${bookId}`
      );
      fetchData();
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const handleQuantityChange = (index, value) => {
    const newData = [...data];
    newData[index].quantity = Math.max(1, newData[index].quantity + value);
    setData(newData);
  };

  const totalPrice = data.reduce(
    (total, item) => total + item.quantity * parseFloat(item.fixedPrice),
    0
  );

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!/^\d{10}$/.test(formData.mobile))
      errors.mobile = "Enter valid 10-digit mobile number";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      userId,
      items: data.map(({ bookId, bookTitle, quantity }) => ({
        bookId,
        bookTitle,
        quantity,
      })),
      ...formData,
    };

    try {
      const orders = data.map(({ bookId, bookTitle, quantity }) => ({
        userId,
        bookId,
        bookTitle,
        quantity,
        userAddress: formData.address,
        phoneNumber: formData.mobile,
      }));

      console.log(payload.address);
      await axios.post(
        `${import.meta.env.VITE_SPRING_API_URL}/api/order/checkout`,
        orders
      );
      toast.success("Order placed successfully!");
      setData([]);
      setShowForm(false);
      setFormData({ name: "", address: "", mobile: "" });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong during checkout.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-20">
      <Toaster />
      <h1 className="text-3xl font-semibold mb-8 text-center">Your Cart</h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {data.map((book, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-white p-4 rounded shadow-md gap-4 justify-between"
            >
              <div className="flex gap-4">
                <img
                  src={book.image}
                  alt={book.bookTitle}
                  className="w-28 h-40 object-cover"
                />
                <div>
                  <h2 className="text-xl font-medium text-gray-800">
                    {book.bookTitle}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 line-through">
                    MRP: Rs. {book.actualPrice}
                  </p>
                  <p className="text-lg text-green-600 font-semibold mt-1">
                    Price: Rs. {book.fixedPrice}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {book.description}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(index, -1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{book.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(index, 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col justify-center items-end gap-2">
                <button
                  onClick={() => handleDelete(book.bookId)}
                  className="text-red-600 hover:text-red-800 font-medium border border-red-600 px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <div className="mt-10 bg-white p-6 rounded shadow text-right">
            <h3 className="text-2xl font-semibold text-gray-800">
              Total: Rs. {totalPrice.toFixed(2)}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Includes all applicable taxes
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleCheckout}
            className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Shipping Details
            </h2>

            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}

            <label className="block mt-3 mb-2">Address</label>
            <textarea
              className="w-full p-2 border rounded mb-2"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            {formErrors.address && (
              <p className="text-red-500 text-sm">{formErrors.address}</p>
            )}

            <label className="block mt-3 mb-2">Mobile Number</label>
            <input
              type="tel"
              className="w-full p-2 border rounded mb-2"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
            />
            {formErrors.mobile && (
              <p className="text-red-500 text-sm">{formErrors.mobile}</p>
            )}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cart;
