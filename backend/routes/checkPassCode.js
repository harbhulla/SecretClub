import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export function checkPasscode(req, res, next) {
  if (req.body.code !== process.env.SECRET_PASSWORD) {
    return res.status(403).json({ success: false, message: "Invalid passcode" });
  }
  next();
}
