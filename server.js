const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./db/connectDB");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/products", productRoutes);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(`${process.env.MONGO_URI}`);
        console.log("Connected to DB");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
