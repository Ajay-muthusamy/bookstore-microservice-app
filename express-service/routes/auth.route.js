import express from "express";
import { authControl } from "../controller/auth.control.js";
import { loginControl } from "../controller/auth.control.js";
import { bookControl } from "../controller/book.control.js";
import { bookList } from "../controller/book.control.js";
const router = express.Router();

router.post('/register',authControl);
router.post('/login',loginControl);
router.post('/add-new-book',bookControl);
router.get('/book-list',bookList);

export default router;