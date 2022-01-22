const res_message = require("../middleware/response");

module.exports = function (error, req, res, next) {
  return res_message(
    res,
    error.response ? error.response.status : 500,
    "Internal server error",
    {
      // status: error.response ? error.response.status : undefined,
      message: error.errmsg
        ? error.errmsg
        : error.data
        ? error.data
        : error.response
        ? error.response.data
        : error.request
        ? error.request
        : error.message
        ? error.message
        : "An error has occurred",
    }
  );
};
