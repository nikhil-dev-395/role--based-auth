import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("db connected :- ", conn.connection.host);
  } catch (error) {
    console.log(error);
    // process.exit(1);
  }
};
export default dbConnect;
