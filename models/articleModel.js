const mongoose = require("mongoose");
const validator = require("validator");

const articleSchema = new mongoose.Schema({
	image: {
		type: String,
		required: [true, "Image cannot be empty"],
	},
	newsHeader: {
		type: String,
		required: [true, "News header cannot be empty"],
		trim: true,
	},
	entryDate: {
		type: String,
		required: [true, "Please insert a date"],
	},
	description: {
		type: String,
		required: [true, "Please give details"],
	},
	deleted: { type: Boolean, default: false },
	
});

const Article = mongoose.model("article", articleSchema);

module.exports = Article;
