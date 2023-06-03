const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// personal modules
const managementRouter = require("./routes/managementRoutes");
const lawyerRouter = require("./routes/lawyerRoutes");
const userRouter = require("./routes/userRoutes");
const { generalErrorHandler } = require("./utils/generalErrorHandler");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/public")));

app.use("/api/v1/managements", managementRouter);
app.use("/api/v1/lawyers", lawyerRouter);
app.use("/api/v1/users", userRouter);
app.use(generalErrorHandler);
app.get("/", (req, res) => {
	res.status(200).json({
		status: "success",
		message: "it's all good baby baby",
	});
});

module.exports = app;
