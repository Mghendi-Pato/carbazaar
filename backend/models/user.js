import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
