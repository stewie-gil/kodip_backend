const jwt = require('jsonwebtoken');
const secret = 'secretkey'; // Replace with your actual secret key

function verifyToken(req, res, next) {
const bearerString = req.headers.authorization;
const token = bearerString.replace('Bearer ', ''); //removing bearer

  if (!token) {
    return res.status(403).json({ message: 'Token is not provided' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    console.log("decoded: ", decoded);
    
    if (err) {
      console.log(err);
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    
    
    next();
  });
}

module.exports = verifyToken;
