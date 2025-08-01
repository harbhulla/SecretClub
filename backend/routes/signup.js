import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from "../pool.js";
import signupValidation from './signupFormValidator.js';
import bcrypt from 'bcryptjs';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

router.post("/signup", signupValidation, hashPassword, async (req, res, next) => {
  console.log("✅ Clean body:", req.body);
  console.log("🔐 Hashed password:", res.locals.hashed);
  
   try {
        const result = await pool.query('INSERT INTO users (fname,lname,email,password,membership) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [req.body.inputField.firstName, req.body.inputField.lastName, req.body.inputField.email, res.locals.hashed, false]
        );
      const user = result.rows[0];
      req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "Signed up & logged in!", user });
    });
    } catch(err) {
    console.error("Signup error:", err);
    return res.status(400).json({ error: err.message });
  }
});

export async function hashPassword(req, res, next) {
  try {
    const hashed = await bcrypt.hash(req.body.inputField.confirmPass, 10);
    res.locals.hashed = hashed;
    next();
  } catch (err) {
    console.error("Error hashing password:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}


export default router;