const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const res = require("express/lib/response");
const cors = require("cors");
dotenv.config({ path: "./config.env" });

const userRouter = require("./routes/user-routes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/", userRouter);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

//   next();
// });

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected");
    });
  })
  .catch((err) => {
    res.json({ error: "database not connected" });
  });
