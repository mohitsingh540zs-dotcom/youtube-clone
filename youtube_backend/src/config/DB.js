import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); // mongo db connection instance
        console.log(`Connection established with mongo db: host - ${conn.connection.host}`);
    } catch (error) {
        console.log(`Connection failed with mongo db, error:-${error.message}`);
        process.exit(1); // exit with error
    }
}

export default connectDB;