const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const crudRoute = require("./routes").crud;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todoVueDB";
const port = 8080;

db = mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("成功連接MongoDB!");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/", crudRoute);
app.use(cors());
app.listen(port, () => {
  console.log(`伺服器聆聽在 port: ${port}`);
});
