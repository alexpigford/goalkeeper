const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();

app.use(express.json());

// DB CONFIG
const db = config.get("mongoURI");

// CONNECT TO MONGO
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected."))
  .catch(err => console.log("Error: ", err));

// ROUTES
app.use("/api/goals", require("./routes/api/goals"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// run build creates static folder
// this serves those static assest if in production
if (process.env.NODE_ENV === "production") {
  // sets the static folder
  app.use(express.static("client/build"));
  // loads index.html in build folder
  app.get("*", (req, res) => {
    // path is a node.js module
    // __dirname = current directory
    // go into client/build/index.html
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// HEROKU || LOCAL
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`The server is running on port ${port}.`);
});
