export function validateCode(req, res, next) {

  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: "Missing passcode" });
  }
  next();
}
