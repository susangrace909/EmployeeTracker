const mysql = require("mysql2");

require("dotenv").config();

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Gc5yvm2mq!",
    database: "employees",
  },
  console.log("Connected to the employees database.")
);

module.exports = db;
