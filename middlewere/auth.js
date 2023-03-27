

const jwt = require("jsonwebtoken");
const Auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token,"masai");
    if (decoded) {
      req.body.UserID = decoded.UserID;
      next();
    } else {
      res.status(400).send({ msg: "login please" });
    }
  } else {
    res.status(400).send({ msg: "login please" });
  }
};

module.exports = {
    Auth
}