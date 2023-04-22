// import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import createError from "../utils/createError.js";
// import createError from "../utils/createError.js";
// Route for registering a new user
export const register = async (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 5);
  try {
    const newUser = await User({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send("User has been created");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(createError(404, "User not found"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(404, "Invalid email and password"));

    const token = jwt.sign(
      {
        id: user._id,
        isRestaurant: user.isRestaurant,
        isDelivery: user.isDelivery,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res.cookie("accessToken", token, { httpOnly: true }).status(200).send(info);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been Logged out");
};
