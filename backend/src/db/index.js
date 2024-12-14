import mongoose from "mongoose";
import { MONGODB_URI } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(MONGODB_URI);
    console.log(
      `MongoDB connected. DB HOST: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log(`MongoDB connection FAILED: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
