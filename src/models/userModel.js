import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: "string",
    },

    password: {
      type: "string",
    },

    role: {
      type: "string",
      enum: ["admin", "manager", "user"],
      // default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
