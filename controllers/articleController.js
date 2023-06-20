const Lawyer = require("../models/lawyerModel");
const multer = require("multer");
const path = require("path");
const { catchAsync } = require("../utils/catchAsync");
const Article = require("../models/articleModel");

const multerStorage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, path.join(__dirname, "../public/article-images"));
	},
	filename: (_, file, cb) => {
		console.log(file);
		cb(null, file.originalname);
	},
});

const multerFilter = (req, file, cb) => {
	if (
		file.mimetype.startsWith("image") ||
		file.mimetype.startsWith("application")
	) {
		cb(null, true);
	} else {
		cb(console.log("first"), false);
	}
};

const uploadImage = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

exports.uploadArticleImage = uploadImage.single("image");

exports.createArticle = catchAsync(async (req, res, next) => {
	try {
		const { body, file } = req;

		body.image = file?.originalname;
		console.log(body);

		// save the article here
		const article = await Article.create(body);

		res.status(201).json({
			status: "success",
			data: {article	},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: "error",
			error: error.toString(),
		});
	}
});

exports.getAllArticles = catchAsync(async (req, res, next) => {
	try {
		// Get all articles here
		const article = await Article.find();
		res.status(200).json({
			status: "success",
			data: {article},
		}); 
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});

exports.getOneArticle = catchAsync(async (req, res, next) => {
	try {
		const { id } = req.params;

		// Get the article here
		const article = await Article.findById(id);
		res.status(200).json({
			status:"success",
			data: {article},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});

exports.updateArticle = catchAsync(async (req, res, next) => {
	try {
		const { id } = req.params;

		// Update the article here

		const article = await Article.findByIdAndUpdate(id, req.body);
		res.status(200).json({
			status: "Updated successfully",
			data: {},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});

exports.deleteArticle = catchAsync(async (req, res, next) => {
	try {
		const { id } = req.params;

		const article = await Article.findByIdAndRemove(id, {
			deleted: true,
		});
		res.status(200).json({
			status: "Deleted successfully",
			data: {
				article,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});
