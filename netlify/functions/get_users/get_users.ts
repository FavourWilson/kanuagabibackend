/* 

export const handler: Handler = async (event, context) => {
	const name = event.queryStringParameters?.name || "stranger";

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: `Hello, ${name}!`,
		}),
	};
}; */

import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Handler } from "@netlify/functions";
import User from "../../../models/userModel";

dotenv.config({ path: "./config.env" });

const dbString = process.env.DATABASE_CONNECTION_STRING?.replace(
	"password",
	process.env.DATABASE_CONNECTION_PASSWORD ?? ""
);

mongoose.set("strictQuery", false);
mongoose
	.connect(dbString ?? "")
	.then((conn) => console.log(conn.connection.id))
	.catch((err) => console.error(err));

export const handler: Handler = async (event, context) => {
	try {
		const email = event.queryStringParameters?.email;
		const password = event.queryStringParameters?.password;

		if (!email) return { statusCode: 400, message: "An email is required" };
		if (!password)
			return { statusCode: 400, message: "A password is required" };

		const user = await User.findOne({ email });

		if (!user)
			return { statusCode: 401, message: "Invalid email or password" };

		// const token = createSendToken(user);

		return { statusCode: 200, user };
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}
};

// const dbString = process.env.DATABASE_CONNECTION_STRING.replace(
// 	"<password>",
// 	process.env.DATABASE_CONNECTION_PASSWORD
// );

const createSendToken = (user: any) => {
	return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_TOKEN_EXPIRES,
	});

	// const cookieOptions = {
	// 	expires: new Date(
	// 		Date.now() +
	// 			Number(process.env.JWT_COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
	// 	),
	// 	httpOnly: true,
	// 	secure: false,
	// };
	// if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
	// res.cookie("SESSIONID", token, cookieOptions);
	// res.status(status).json({
	// 	status: "success",
	// 	token,
	// 	data: {
	// 		user,
	// 	},
	// });
};
