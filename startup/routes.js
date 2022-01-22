const express = require("express");
const multer = require("multer");
const path = require("path");

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        Math.random().toString(36).substring(2) +
        "-" +
        file.originalname.replace(/ /g, "_")
    );
  },
});

let fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/png"
  ) {
    req.body.isValid = true;
    cb(null, true);
  } else {
    req.body.isValid = false;
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

const suppliers = require("../routes/suppliers");
const process = require("../routes/process");

module.exports = function (app) {
  app.use(express.json());

  app.use("/api/v1/suplliers", suppliers);

  app.use("/api/v1/process", upload.single("file"), process);

  app.use("/", (req, res) => res.send(`Hello World!. Rundoo is here.`));
  app.use("*", (req, res) => res.send(`Wrong URL. Rundoo is here.`));
};
