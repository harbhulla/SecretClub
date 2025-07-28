import express from "express";
import signupRoute from "./routes/signup.js";
import dotenv from 'dotenv';
import cors from 'cors';  

dotenv.config();
const app = express();


app.use(cors());

app.use(express.json());
app.use("/api/signup", signupRoute);

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});