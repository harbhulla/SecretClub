import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from "../pool.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();



router.post("/dashboard", async (req,res) => {
     try {
        await pool.query('INSERT INTO message (input,user_id,author) VALUES ($1, $2,$3)',
        [req.body.messageText,req.user.id,req.user.fname]
    );
    } catch(err) {
        return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ success: true, message: "Message set" });
})

router.get("/dashboard", async (req,res) => {

     try {
    const result = await pool.query('SELECT * FROM message ORDER BY date DESC');
    
    
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch message' });
  }
})

export default router;