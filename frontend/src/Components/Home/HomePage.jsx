import React from "react";
import Booklist from "./Booklist";

const HomePage = () => {
  return (
    <div>
      <div>
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/294/867/non_2x/digital-book-web-banner-design-student-reading-online-book-on-tablet-online-education-digital-classroom-e-learning-concept-header-or-footer-banner-free-vector.jpg"
          alt=""
        />
      </div>
      <div className="bg-blue-950">
        <Booklist />
      </div>
    </div>
  );
};

export default HomePage;
