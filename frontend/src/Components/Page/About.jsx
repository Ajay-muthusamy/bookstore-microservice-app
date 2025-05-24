import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4 text-center">About Us</h1>
      <p className="text-gray-700 text-lg leading-relaxed">
        Welcome to <strong>Bookstore</strong>, your ultimate online destination for book lovers! 
        We are passionate about connecting readers with a diverse selection of titles across all genres, 
        from bestsellers to hidden gems. Our mission is to inspire a love for reading by providing a curated 
        collection that caters to every taste.
      </p>
      <p className="text-gray-700 text-lg leading-relaxed mt-4">
        At Bookstore, we believe in the power of stories to enrich lives. 
        With fast shipping, exceptional customer service, and a user-friendly shopping experience, 
        we strive to make your book-buying journey enjoyable and effortless. 
        Join our community of readers and discover your next great read today!
      </p>
    </div>
  );
};

export default About;
