const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Lawyer = require("../models/lawyerModel");
const fs = require("fs");
dotenv.config({ path: "../config.env" });

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./lawyerData.json"), "utf-8")
);
// return console.log(data);

const dbString = process.env.DATABASE_CONNECTION_STRING.replace(
  "<password>",
  process.env.DATABASE_CONNECTION_PASSWORD
);

mongoose
  .connect(dbString)
  .then((conn) => console.log(conn.connection._connectionString))
  .catch((err) => console.log(err));

const createMany = async () => {
  try {
    await Lawyer.create(data);
    console.log("data uploaded successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

const deleteMany = async () => {
  try {
    await Lawyer.deleteMany();
    console.log("data deleted successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

if (process.argv[2] === "upload") {
  createMany();
} else if (process.argv[2] === "delete") {
  deleteMany();
}
