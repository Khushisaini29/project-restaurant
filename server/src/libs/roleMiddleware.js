import { verifyToken } from "./token.js";

const roleMiddleware = (...allowedRoles) => {
  return async (req, res, next) => {
    const { jwt } = req.cookies;

    if (!jwt) {
      return res.status(400).json({
        message: "Token Not Found",
        success: false,
      });
    }

    const decodeToken = await verifyToken(jwt);

    if (!decodeToken.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!allowedRoles.includes(decodeToken.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};

export default roleMiddleware;