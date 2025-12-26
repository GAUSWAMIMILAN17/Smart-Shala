import jwt from "jsonwebtoken";

export const authentication = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Not authorized , token missing",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
