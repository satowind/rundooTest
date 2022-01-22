const winston = require("winston");
const mongoose = require("mongoose");

const dbUserName = process.env.DBUSERNAME;
const dbPassWord = process.env.DBPASSWORD;
const dbURL = process.env.DBURL;
const dbPort = process.env.DBPORT;
const dbName = process.env.DBNAME;

module.exports = function () {
  mongoose
    .connect(
      `mongodb://${dbUserName}:${dbPassWord}@${dbURL}:${dbPort}/${dbName}?ssl=true&replicaSet=atlas-4cy19n-shard-0&authSource=admin&retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    // .connect("mongodb://localhost/Eversend", {
    //   useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false,
    // })
    .then(() => winston.info("Connected to MongoDB..."));
};
