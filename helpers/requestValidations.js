const Joi = require("joi");

//GENERAL Validations for General

function validateSupplier(data) {
  const schema = {
    name: Joi.string().required().min(3),
    address: Joi.string().required().min(5),
    imageUrl: Joi.string().required().uri(),
  };

  const _validationOptions = {
    abortEarly: false, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true, // remove unknown keys from the validated data
  };

  return Joi.validate(data, schema, _validationOptions);
}

exports.validateSupplier = validateSupplier;
