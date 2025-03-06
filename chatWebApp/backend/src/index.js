import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}));



app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})