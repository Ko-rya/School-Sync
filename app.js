require("dotenv").config();

// Frameworks
const express = require("express");
const app = express();
const hbs = require("hbs");

// Config
require("./config")(app);
require("./db");

// HBS config
hbs.registerPartials(__dirname + "/views/partials");

//Middlewares
const isLoggedIn = require("./middleware/isLoggedIn");

// Local variable
app.use("/", (req, res, next) => {
  app.locals.currentUser = req.session.currentUser;
  next();
});

// Routes
app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/auth.routes"));
// app.use("/dashboard", isLoggedIn)
app.use("/dashboard", require("./routes/dashboard/profiles.routes"));
app.use("/dashboard", require("./routes/dashboard/grades.routes"));
app.use("/dashboard", require("./routes/dashboard/tests.routes"));

// Errors Handling
require("./error-handling")(app);

module.exports = app;
