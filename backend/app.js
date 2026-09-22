require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const multer = require('multer');
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const categoryRoute = require("./routes/category.route");
const productRoute = require("./routes/product.route");
const authRoute = require("./routes/auth.route");
const cartRoute = require("./routes/cart.route")

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "images"))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

function fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader('Access-Control-Allow-Headers', "Content-Type , Authorization");
    res.setHeader('Access-Control-Allow-Methods', "POST , DELETE , PUT , GET");
    next();
})

app.use(express.static(path.join(__dirname, "images")))
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/auth", authRoute)
app.use("/api/cart", cartRoute)

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Listening on port 5000");
    })
}).catch((err) => { console.log(err) });