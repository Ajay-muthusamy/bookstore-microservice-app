import express from "express";
import bookSchema from "../model/book.model.js";

export const bookControl = async (req, res) => {
  const {
    bookTitle,
    image,
    fixedPrice,
    actualPrice,
    rating,
    isSale,
    isTrending,
    description
  } = req.body;
   console.log(req.body);
  try {
    const addBook = new bookSchema({
      bookTitle,
      image,
      fixedPrice,
      actualPrice,
      rating,
      isSale: isSale === 'true' || isSale === true,
      isTrending: isTrending === 'true' || isTrending === true,
      description
    });

    await addBook.save();
    res.status(200).json({ message: "New Book Added Successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error in adding book", error: error.message });
  }
};


export const bookList = async (req, res) => {
    try {
        const response = await bookSchema.find();
        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching book list:", error);
        res.status(500).json({ message: "Error fetching books"});
    }
};
