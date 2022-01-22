const winston = require("winston");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.static("files"));
require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();

const port = process.env.PORT;

app.listen(port, () => winston.info(`Listening on port ${port}...`));
