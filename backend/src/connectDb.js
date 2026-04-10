const mongoose = require("mongoose");

async function connectDB(){
    try {
        connection_url = "";
        await mongoose.connect(process.env.DB_URL || connection_url);
        console.log("Data Base connected!");
    } catch(e){
        console.error("Error Connecting to DB!", e);
        process.exit(1);
    }
};

module.exports = {
    connectDB
};