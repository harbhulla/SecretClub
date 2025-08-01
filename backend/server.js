import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';  
import session from "express-session";
import passport from "passport";
import messages from "./routes/messages.js";

dotenv.config({ path: '../.env' });

import "./routes/login.js"; 


import signupRoute from "./routes/signup.js";
import membershipStatus from "./routes/membershipStatus.js";

const app = express();
const router = express.Router();
const PORT = process.env.SERVER_PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));


app.use(session({
  secret: process.env.SESSION_SECRET || "secret key",
  resave: false,
  saveUninitialized: false,
  cookie: {
  secure: false,     
  httpOnly: true     
}
}));


app.use(passport.initialize());
app.use(passport.session());


app.use("/api", signupRoute);
app.use("/api/signup", membershipStatus);
app.use("/api", messages);

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "Logged in!", user });
    });
  })(req, res, next);
});

app.post("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);         
        res.json({ message: "Logged out" });
  });
})



app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});

