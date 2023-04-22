import jwt from "jsonwebtoken";
import User from "../models/User.js";
import createError from "../utils/createError.js";
export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (req.userId !== user._id.toString()) {
    return next(createError(404, "You do not have permission to delete"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("Your account has been deleted");
};
