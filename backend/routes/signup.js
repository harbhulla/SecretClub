import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from "../pool.js";
import { validationResult } from 'express-validator';
import signupValidation from './signupFormValidator.js';
import bcrypt, { hash } from 'bcryptjs';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

router.post("/", signupValidation, async (req,res) => {
    const errors = validationResult(req);

    const hashedPassword = await hashPass(req.body.inputField.confirmPass);
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});
    try {
        await pool.query('INSERT INTO users (fname,lname,email,password,membership) VALUES ($1, $2, $3, $4, $5)',
        [req.body.inputField.firstName, req.body.inputField.lastName, req.body.inputField.email, JSON.stringify(hashedPassword), false]
        );
    } catch(err) {
        return res.status(400).json({ error: err.message });
    }
    res.send({ok: "Success!"});
}
)

async function hashPass(password) {
    try {
        const salt = 10;
        const hash = await bcrypt.hash(password,salt);
        return hash;
    } catch(error) {
        console.log("Error hashing password", error);
        throw error;
    }
}

export default router;