const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(express.json());
app.use(cors());


mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database Connection Established"));


app.get("/", (request, response) => {
	response.send(`API is running on ${PORT}`)
})

const studentRouter = require("./routes/students");
app.use("/students", studentRouter);

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
