const express = require("express");
const router = express.Router();
const fs = require("fs");

const res_message = require("../middleware/response");
const errorHandle = require("../middleware/error");

router.post("/", async (req, res) => {
  try {
    const file = req.file;

    if (!req.body.isValid) {
      return res_message(res, 400, {
        message: "Only png, jpeg and jpg files is allowed",
      });
    }

    if (!file) {
      return res_message(res, 400, {
        message: "Please include a file",
      });
    }

    let path = file.path;

    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/png"
    ) {
      fs.unlinkSync(path);
      return res_message(res, 400, "Only images are allowed file is allowed!");
    }

    let name = file.originalname.split(".");

    name.pop();
    name.shift();

    let exist = name.some((v) => {
      return regexImport.test(v);
    });

    if (exist) {
      fs.unlinkSync(path);

      return res_message(res, 400, {
        message: "The file is not allowed!",
      });
    }

    return res_message(res, 200, "Image Upload was successful", { file });
  } catch (error) {
    errorHandle(error, req, res);
  }
});

module.exports = router;
