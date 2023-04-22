import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String, required: false },
    phone: { type: String, required: false },
    desc: { type: String, required: false },
    desc: { type: String, required: false },
    paymentMethod: { type: String, required: false },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    isRestaurant: { type: Boolean, default: false },
    isDelivery: { type: Boolean, default: false },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
