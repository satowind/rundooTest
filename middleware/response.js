module.exports = function (res, status, message, data = {}) {
  return res.status(status).send({
    status,
    message,
    data,
  });
};
