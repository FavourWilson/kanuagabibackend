const mongoose = require("mongoose");
const validator = require("validator");

const lawyerSchema = new mongoose.Schema({
	image: {
		type: String,
		required: [true, "A lawyer must have an image"],
	},
	fullName: {
		type: String,
		required: [true, "A lawyer must have a fullname"],
		trim: true,
	},
	role: {
		type: String,
		required: [true, "A lawyer must have a role"],
		trim: true,
	},
	professionalMembership: {
		type: [String],
	},
	educationalQualification: {
		type: [String],
	},
	yearOfCall: {
		type: Number,
		required: [true, "A lawyer must have a year of call"],
	},
	location: {
		type: String,
		required: [true, "A lawyer must have a work location"],
	},
	practiceAreas: [String],
	contactEmail: {
		type: String,
		required: [true, "A lawyer must have a contact email"],
		// validate: {
		//   validator: validator.isEmail,
		//   message: "{VALUE} is not a valid email. please put another value",
		// },
	},
	description: {
		type: String,
		required: [true, "A lawyer must have a description"],
	},
	deleted: { type: Boolean, default: false },
	addons: {
		type: String,
	},
});

const Lawyer = mongoose.model("lawyer", lawyerSchema);

module.exports = Lawyer;
