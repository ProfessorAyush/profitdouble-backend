import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    
    // Fix: Handle different possible JWT payload structures
    req.user = { 
      _id: data.user?._id || data._id || data.id || data.userId 
    };
    
    // Add validation to ensure we got a valid user ID
    if (!req.user._id) {
      return res.status(401).send({ error: "Invalid token payload" });
    }
    
    next();
  } catch (error) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};