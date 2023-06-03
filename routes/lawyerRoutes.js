const express = require("express");
// const { authProtect } = require("../controllers/adminAuth");

const {
	createLawyer,
	uploadLawyerImage,
	getAllLawyers,
	getOneLawyer,
	updateLawyer,
	deleteLawyer,
} = require("../controllers/lawyerController");
const Router = express.Router();

Router.route("/").post(uploadLawyerImage, createLawyer).get(getAllLawyers);
Router.route("/:id").get(getOneLawyer).patch(updateLawyer);
Router.route("/delete/:id").delete(deleteLawyer).get(getAllLawyers);

module.exports = Router;
