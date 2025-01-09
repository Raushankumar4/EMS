const jwt = require("jsonwebtoken");
const User = require("../model/userModel.js");

// const isAuthenticated = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: "User Not Authenticated: Token missing" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Decoded Token:', decoded);  
//     req.user = decoded._id;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "User Not Authenticated: Invalid or Expired Token" });
//   }
// };

// module.exports = isAuthenticated;


// isAdmin

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user);
  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access Denied Only Admin Can Access" });
  }
  next();
};


//Using Bearer Token for Authentication

// const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "User Not Authenticated" });
  }

  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "User Not Authenticated" });
  }
};

// module.exports = isAuthenticated;

module.exports = { isAuthenticated,isAdmin };