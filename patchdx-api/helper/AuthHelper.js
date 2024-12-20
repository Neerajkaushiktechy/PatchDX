const jwt = require('jsonwebtoken');


exports.createToken = (data) => jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });

exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Token is missing',
    });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token is expired' });
  }
};