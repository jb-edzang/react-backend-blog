require("dotenv").config();
const express = require("express");
//const mongoose = require("mongoose");
const knex = require("knex");
const { Model } = require("objection");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");

// constructeur knex(config) initialise knex avec la configuration de la DB
const knexConfig = require("./knexfile");
const db = require("knex")(knexConfig.development);
Model.knex(db);
// verify connection to DB
db.raw("SELECT 1")
  .then(() => {
    console.log("Connected to blogreact");
  })
  .catch((err) => {
    console.error("Error connecting to blogreact:", err);
  });
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
//connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cros Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// middleware for cookies
app.use(cookieParser());

// server static files
app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/posts", require("./routes/api/posts"));
app.use("/users", require("./routes/api/users"));

//app.use(verifyJWT);
app.use(verifyJWT);
app.use("/posts", require("./routes/api/posts"));
app.use("/users", require("./routes/api/users"));

/*app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "view", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
}); */

//app.use(errorHandler);
app.use(errorHandler);

/*mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}); */

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
