const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

const dbUserName = process.env.DBUSERNAME;
const dbPassWord = process.env.DBPASSWORD;
const dbURL = process.env.DBURL;
const dbPort = process.env.DBPORT;
const dbName = process.env.DBNAME;

module.exports = function () {
  winston.handleExceptions(
    new winston.transports.File({
      filename: "uncaughtExceptions.log",
    })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(winston.transports.File, {
    filename: "logfile.log",
  });

  winston.add(winston.transports.MongoDB, {
    db: `mongodb://${dbUserName}:${dbPassWord}@${dbURL}:${dbPort}/${dbName}?ssl=true&replicaSet=atlas-4cy19n-shard-0&authSource=admin&retryWrites=true&w=majority`,
    level: "info",
  });
};
