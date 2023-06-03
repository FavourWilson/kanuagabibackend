const express = require("express");
// const { authProtect } = require("../controllers/adminAuth");

const {
	createManagement,
	uploadManagementImage,
	getAllManagements,
	getOneManagement,
	updateManagement,
	deleteManagement,
} = require("../controllers/managementController");
const Router = express.Router();

Router.route("/")
	.post(uploadManagementImage, createManagement)
	.get(getAllManagements);
Router.route("/:id").get(getOneManagement).patch(updateManagement);
Router.route("/delete/:id").delete(deleteManagement).get(getAllManagements);

module.exports = Router;
