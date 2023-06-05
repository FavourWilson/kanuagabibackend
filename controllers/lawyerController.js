const Lawyer = require("../models/lawyerModel");
const multer = require("multer");
const path = require("path");
const { catchAsync } = require("../utils/catchAsync");

const multerStorage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, path.join(__dirname, "../public/lawyerImages"));
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

exports.uploadLawyerImage = uploadImage.single("image");

exports.createLawyer = catchAsync(async (req, res, next) => {
	try {
		const { body, file } = req;

		body.image = file.originalname;
		console.log(body);
		const lawyer = await Lawyer.create(body);
		res.status(201).json({
			status: "success",
			data: {
				lawyer,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});

exports.getAllLawyers = catchAsync(async (req, res, next) => {
	try {
		const lawyers = await Lawyer.find();
		res.status(200).json({
			status: "success",
			data: {
				lawyers,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});

exports.getOneLawyer = catchAsync(async (req, res, next) => {
	try {
		const { id } = req.params;
		const lawyers = await Lawyer.findById(id);
		res.status(200).json({
			status: "success",
			data: {
				lawyers,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});

exports.updateLawyer = catchAsync(async (req, res, next) => {
	try {
		const { id } = req.params;
		const lawyers = await Lawyer.findByIdAndUpdate(id, req.body);
		res.status(200).json({
			status: "Data updated successfully",
			data: {
				lawyers,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});

exports.deleteLawyer = catchAsync(async (req, res, next) => {
	try {
		const { id } = req.params;
		const lawyers = await Lawyer.findByIdAndUpdate(id, { deleted: true });
		res.status(200).json({
			status: "Deleted successfully",
			data: {
				lawyers,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});
