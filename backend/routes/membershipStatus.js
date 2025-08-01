import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from "../pool.js";
import { validateCode } from './validateCode.js';
import { checkPasscode } from './checkPassCode.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

router.post("/membership", validateCode, checkPasscode, async (req,res) => {
    
    await pool.query("UPDATE users SET membership = true WHERE email = $1", [req.body.input.email]);
    res.status(200).json({ success: true });
    }
)

export default router;