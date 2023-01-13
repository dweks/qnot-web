require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/noteList");
const app = express();
// const cors = require("cors");

// more middleware
// attaches any data on a request to the req as json
app.use(express.json());
// app.use(cors())
// fires for every request that comes in, logs everything
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next(); // next must be called otherwise the request's main function won't happen
});

// ROUTES
// the "/api/notes/" says use `noteRoutes` if request goes here -- makes it relative
app.use("/api/notes", noteRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests only when connected to db
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
