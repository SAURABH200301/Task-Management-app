/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Saurabhknowswh0kno0ws';


const authMiddleware = (req, res, next) => {
  // Get the token from the request headers, query parameters, or cookies
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token found, authorization denied' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Set the user ID in the request object
    req.user = decoded.user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
