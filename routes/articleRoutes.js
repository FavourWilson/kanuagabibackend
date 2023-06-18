const express = require("express");

const {
	uploadArticleImage,
	createArticle,
	getAllArticles,
	getOneArticle,
	updateArticle,
	deleteArticle,
} = require("../controllers/articleController");
const Router = express.Router();

Router.route("/").post(uploadArticleImage, createArticle).get(getAllArticles);
Router.route("/:id").get(getOneArticle).patch(updateArticle);
Router.route("/delete/:id").delete(deleteArticle).get(getAllArticles);

module.exports = Router;
