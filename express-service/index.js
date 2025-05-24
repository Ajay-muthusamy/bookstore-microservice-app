import express from "express";
import 'dotenv/config'
import router from "./routes/auth.route.js";
import bookrouter from "./routes/book.route.js";
import { databaseConnect } from "./database/dbConnect.js";
import cors from 'cors'
const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json());

app.use('/bk',router);
app.use('/nb',bookrouter);

databaseConnect();
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
