import React from 'react';

const Contactus = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-10">
       
        <div className="space-y-4 text-gray-800">
          <h2 className="text-xl font-semibold">Get in Touch</h2>
          <p>Have a question, feedback, or need help with an order? We'd love to hear from you.</p>
          <p><strong>Email:</strong> <a href="mailto:support@bookstores.com" className="text-blue-600 underline">support@bookstores.com</a></p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> Bookstore HQTamil Nadu, India</p>
        </div>

       
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input type="text" placeholder="Your Name" className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block font-medium mb-1">Subject</label>
            <input type="text" placeholder="Subject" className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea rows="4" placeholder="Your message..." className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
          </div>

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contactus;
