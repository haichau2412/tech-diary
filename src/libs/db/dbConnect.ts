import mongoose from "mongoose";

let isConnected = false;

const url = `mongodb+srv://chau96cc:${process.env.NEXT_PUBLIC_MONGO}@cluster0.o9pfd.mongodb.net/Utube?retryWrites=true&w=majority&appName=Cluster0`;

const dbConnect = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(url);
    isConnected = true;
    console.log("isConnected", isConnected);
  } catch (err) {
    throw err;
  }
};

export default dbConnect;
