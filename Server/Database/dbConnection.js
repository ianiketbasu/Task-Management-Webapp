import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/TASK_MANAGEMENT`
    );
    console.log(
      `\nMongoDB connected !! \nDB HOST :  ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MONGODB connection error`, error);
    process.exit(1);
  }
};

export default connectDB;
