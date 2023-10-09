import mongoose from "mongoose";

export const db = async () => {
  try {
    await mongoose.connect(process.env.DB_NAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database', error);
  }
}