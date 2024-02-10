import Car from "../models/car.js";
import User from "../models/user.js";
import cloudinary from "../utils/clodinary.js";
import mongoose from "mongoose";

export const createCar = async (req, res) => {
  const { vehicleImages } = req.body;
  const {
    make,
    model,
    year,
    color,
    fuelType,
    engineCapacity,
    transmissionType,
    hybrid,
    sunRoof,
    numberOfDoors,
    tireSize,
    mileage,
    heatedSeats,
    driveType,
    soundSystemMake,
    interiorColor,
    interiorMaterial,
    acceleration,
    torque,
    horsepower,
  } = req.body.vehicleInformation;
  const { carCondition, reasonForSelling, ownershipPeriod, price } =
    req.body.ownershipInfomartion;
  const user = req.user.id;

  try {
    const existingUser = await User.findById(user);
    const uploadResponses = await Promise.all(
      Object.values(vehicleImages).map(async (imageData) => {
        const uploadResponse = await cloudinary.uploader.upload(imageData, {
          upload_preset: "Carbazaar",
        });
        return uploadResponse;
      })
    );
    const images = uploadResponses.map((response) => response.public_id);
    const newCar = new Car({
      make,
      model,
      year,
      color,
      fuelType,
      engineCapacity,
      transmissionType,
      hybrid,
      sunRoof,
      numberOfDoors,
      tireSize,
      mileage,
      heatedSeats,
      driveType,
      soundSystemMake,
      interiorColor,
      interiorMaterial,
      acceleration,
      torque,
      horsepower,
      carCondition,
      reasonForSelling,
      ownershipPeriod,
      price,
      images,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newCar.save({ session });
    existingUser.cars.push(newCar);
    await existingUser.save({ session });
    await session.commitTransaction();
    res.status(200).json({ message: "Successfully uploaded car information" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json({ message: "Cars retrived successfully", cars });
  } catch (error) {
    res.status(404).json({ message: "Error retriving cars" });
  }
};

export const getCarById = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Car.findById(carId);
    if (!car) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    res.status(200).json({ message: "Car retrieved successfully", car });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the car" });
  }
};
