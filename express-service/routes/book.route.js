import express from "express";
import bookSchema from "../model/book.model.js";

const bookrouter = express.Router();

bookrouter.post('/add-new-book',bookSchema);

export default bookrouter;