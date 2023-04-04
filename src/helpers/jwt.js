const jwt = require("jsonwebtoken");
const createJwt = (payload) => {
  return jwt.sign(payload, process.env.JWT_PRIVATE_KEY);
};

const isJwtValid = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, user) => {
        if (error) {
          reject(false);
        }
        resolve(user);
      });
    } catch (error) {
      reject(false);
    }
  });
};

module.exports = {
  createJwt,
  isJwtValid,
};
