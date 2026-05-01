const express = require("express");
const app = express();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
connectDB();
app.use("/user", userRoutes);

app.listen(3000, () => {
    console.log("server running on port 3000");
})
