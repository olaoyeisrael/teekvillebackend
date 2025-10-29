const mongoose = require("mongoose");

const connectDB = async () => {
  
    try {
        await mongoose.connect("mongodb+srv://israelolaoyeaduragbemi:passwordDB@cluster0.rvl5cuw.mongodb.net/teekville");

        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;

