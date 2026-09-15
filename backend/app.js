require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const multer = require('multer');
const path = require("path");
const app = express();
const categoryRoute = require("./routes/category.route");
const productRoute = require("./routes/product.route");
app.use(express.json());

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
app.use(express.static(path.join(__dirname, "images")))
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Listening on port 5000");
    })
}).catch((err) => { console.log(err) });