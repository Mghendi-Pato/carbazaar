import mongoose from "mongoose";
const { Schema } = mongoose;

const carSchema = new Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  engineCapacity: {
    type: Number,
    required: true,
  },
  transmissionType: {
    type: String,
    required: true,
  },
  hybrid: {
    type: Boolean,
    default: false,
  },
  sunRoof: {
    type: Boolean,
    default: false,
  },
  numberOfDoors: {
    type: Number,
    required: true,
  },
  tireSize: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  heatedSeats: {
    type: Boolean,
    default: false,
  },
  driveType: {
    type: String,
    required: true,
  },
  soundSystemMake: {
    type: String,
    required: true,
  },
  interiorColor: {
    type: String,
    required: true,
  },
  interiorMaterial: {
    type: String,
    required: true,
  },
  acceleration: {
    type: Number,
    required: true,
  },
  torque: {
    type: Number,
    required: true,
  },
  horsepower: {
    type: Number,
    required: true,
  },
  carCondition: {
    type: String,
    required: true,
  },
  reasonForSelling: {
    type: String,
    required: true,
  },
  ownershipPeriod: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Car = mongoose.model("Car", carSchema);
export default Car;
