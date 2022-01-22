const express = require("express");
const router = express.Router();

const { validateSupplier } = require("../helpers/requestValidations");
const { Suppliers } = require("../models/suppliers");

const res_message = require("../middleware/response");
const errorHandle = require("../middleware/error");

router.post("/", async (req, res) => {
  const { error } = validateSupplier(req.body);
  if (error) return res_message(res, 400, error.details[0].message);

  try {
    let supplier = new Suppliers({
      ...req.body,
    });

    await supplier.save();

    return res_message(res, 200, "Supplier Created", supplier);
  } catch (error) {
    errorHandle(error, req, res);
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await Suppliers.find();
    return res_message(res, 200, "Supplier Details", response);
  } catch (error) {
    errorHandle(error, req, res);
  }
});

module.exports = router;
