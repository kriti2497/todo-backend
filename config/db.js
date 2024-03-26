const { connect } = require("mongoose");

require("dotenv").config();

const connectDB = () => {
  connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Error occured", error));
};

module.exports = connectDB;
