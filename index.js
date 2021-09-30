const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const convRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

dotenv.config();

//Use middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//Routes
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/conversations", convRoute)
app.use("/api/messages", messageRoute)

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true},()=>{
    console.log("Connected to MongoDB")
})

app.listen(8800, ()=>{
    console.log("Backend server running yes!!")
})