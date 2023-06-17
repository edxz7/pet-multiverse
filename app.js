// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// usamos la session aca:
require('./config/session.config')(app);

// default value for title local
// 0.0018 
const capitalize = require("./utils/capitalize");
const projectName = "+kta-multiverse";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
const petRoutes = require('./routes/pet.routes');
const userRoutes = require('./routes/auth.routes');
app.use("/", indexRoutes);
app.use('/pet', petRoutes);
app.use('/auth', userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
