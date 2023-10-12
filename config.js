const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const URL = process.env.MONGODB_CONNECT_URI;
mongoose.set("strictQuery", true);
const connectToMongo = async () => {
  try {
    let db = await mongoose.connect(URL);
    console.log(db.connection.host);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongo;
