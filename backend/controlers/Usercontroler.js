import User from "../models/user.js";

export const userList = async (req, res) => {
  const users = await User.find();
  res.status(201).json({ message: "Users retrived successfully", users });
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
