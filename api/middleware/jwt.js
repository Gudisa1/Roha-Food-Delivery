import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not authenticated"));
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(400, "It's not a valid token"));

    req.userId = payload.id;
    req.isDelivery = payload.isDelivery;
    req.isRestaurant = payload.isRestaurant;
  });
  next();
};
