
const mongoose = require("mongoose");

const connectToMongoDB =  () => {
  try {
     const db_connect = process.env.MONGO_URI;
      mongoose.connect(db_connect, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
      serverSelectionTimeoutMS: 50000, 
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000, 
    });

    
    const connection = mongoose.connection;

    connection.on("error", (error) => {
      console.log("MongoDB Connection Error at Time:", new Date(), error);
    });

    connection.once("open", () => {
      console.log("Connected to MongoDB at Time:", new Date());
    });
  } catch (error) {
    console.log("Failed to connect to MongoDB at Time:", new Date(), error);
  }
};

module.exports = {connectToMongoDB};
// mongodb://segmentpnp:Taw%26k5RT56%267GsRy%26n@5.178.98.2:15497/