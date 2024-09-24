import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "no Token , auth denied" });
    }
    try {
      let decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      console.log("the decoded user ", req.user);
      next();
    } catch (error) {
      res
        .status(400)
        .json({ message: "token is not valid", error: error.message });
    }
  } else {
    return res.status(401).json({ message: "authorization denied, no token" });
  }
};

export default verifyToken;
