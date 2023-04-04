const { isJwtValid } = require("../../helpers/jwt");

const verifyJwt = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(400).json({
        error: "Authorization header is not present.",
      });
    }
    const token = authHeader.split(" ")[1];
    const data = await isJwtValid(token);
    console.log({ data });
    req.user = data;
    next();
  } catch (error) {
    res.status(401).json({
      error: "Token is not valid!",
    });
  }
};

module.exports = {
  verifyJwt,
};
