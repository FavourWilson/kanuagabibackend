const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const appError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const { promisify } = require("util");

const createSendToken = (res, status, user) => {
	try {
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_TOKEN_EXPIRES,
		});

		const cookieOptions = {
			expires: new Date(
				Date.now() +
					Number(process.env.JWT_COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
			),
			httpOnly: true,
			secure: false,
		};
		if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
		res.cookie("SESSIONID", token, cookieOptions);
		res.status(status).json({
			status: "success",
			token,
			data: {
				user,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			error,
		});
	}
};

exports.login = catchAsync(async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email) return next(new appError("An email is required", 404));
		if (!password) return next(new appError("A password is required", 404));
		const user = await User.findOne({ email });
		if (!user) return next(new appError("Invalid email or password"));
		createSendToken(res, 200, user);
	} catch (error) {
		return next(new appError(error.toString(), 500));
	}
});

exports.signUp = catchAsync(async (req, res, next) => {
	try {
		const { email, password } = req.body;
		console.log(req.body);
		if (!email) return next(new appError("An email is required", 404));
		if (!password) return next(new appError("A password is required", 404));
		const user = await User.create({ email, password });
		createSendToken(res, 201, user);
	} catch (error) {
		return next(new appError(error.toString(), 500));
	}
});

exports.authProtect = catchAsync(async (req, res, next) => {
	try {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
		} else if (req.cookies.SESSIONID) token = req.cookies.SESSIONID;
		if (!token)
			return next(
				new appError(
					"you are not logged in, Please login to get access"
				)
			);

		const validate = await promisify(jwt.verify)(
			token,
			process.env.JWT_SECRET
		);
		const { id } = validate;
		const user = await User.findById(id);
		if (!user)
			return next(
				new appError(
					"The user belonging to this token does no longer exist",
					401
				)
			);

		req.user = user;
		next();
	} catch (error) {
		return next(new appError(error.toString(), 500));
	}
});
