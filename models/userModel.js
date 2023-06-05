const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		// unique: [true, "A user belonging to this email already exists"],
		required: [true, "An email is required"],
		validate: {
			validator: validator.isEmail,
			message: "{VALUE} is not a valid email. please put another value",
		},
	},
	password: {
		type: String,
		minLength: [8, "A password must be at least 8 characters"],
		select: false,
	},
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("user", userSchema);
module.exports = User;

validator;
