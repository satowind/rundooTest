const Joi = require("joi");
const object = require("joi/lib/types/object");
const mongoose = require("mongoose");

const Suppliers = mongoose.model(
  "Suppliers",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      address: { type: String, required: true },
      imageUrl: { type: String, required: true },
    },
    { timestamps: true }
  )
);

exports.Suppliers = Suppliers;
