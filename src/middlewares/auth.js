import * as utils from "../utils/index.js";
const { verifyToken } = utils.jwt;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ error: "UNAUTHORIZED" });
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "INVALID TOKEN" });
  }
};



export default authMiddleware;
