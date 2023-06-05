const multer = require("multer");
const path = require("path");
const { catchAsync } = require("../utils/catchAsync");
const Management = require("../models/managementModel");

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

exports.uploadManagementImage = uploadImage.single("image");

exports.createManagement = catchAsync(async (req, res, next) => {
	try {
		const { body, file } = req;

		body.image = file.originalname;
		console.log(body);
		const managements = await Management.create(body);
		res.status(201).json({
			status: "success",
			data: { managements },
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});

exports.getAllManagements = catchAsync(async (req, res, next) => {
	try {
		const managements = await Management.find();
		res.status(200).json({
			status: "success",
			data: {
				managements,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});

exports.getOneManagement = catchAsync(async (req, res, next) => {
	try {
		const { id } = req.params;
		const managements = await Management.findById(id);
		res.status(200).json({
			status: "success",
			data: {
				managements,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});

exports.updateManagement = catchAsync(async (req, res, next) => {
	try {
		const { id } = req.params;
		const managements = await Management.findByIdAndUpdate(id, req.body);
		res.status(200).json({
			status: "Data updated successfully",
			data: {
				managements,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});

exports.deleteManagement = catchAsync(async (req, res, next) => {
	try {
		const { id } = req.params;
		const managements = await Management.findByIdAndUpdate(id, {
			deleted: true,
		});
		res.status(200).json({
			status: "Deleted successfully",
			data: {
				managements,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
});
