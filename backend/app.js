require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());

const categoryRoute = require("./routes/category.route");


app.use("/api/category", categoryRoute);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Listening on port 5000");
    })
}).catch((err) => { console.log(err) });