const Lawyer = require("../models/lawyerModel");
const multer = require("multer");
const path = require("path");
const { catchAsync } = require("../utils/catchAsync");

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
		// const article =

		// res.status(201).json({
		// 	status: "success",
		// 	data: {	},
		// });
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
		/*
		res.status(200).json({
			status: "success",
			data: {},
		}); */
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

		// res.status(200).json({
		// 	data: {},
		// });
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

		// res.status(200).json({
		// 	status: "Updated successfully",
		// 	data: {},
		// });
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

		// Delete the article here

		// res.status(200).json({
		// 	status: "Deleted successfully",
		// 	data: {},
		// });
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});
