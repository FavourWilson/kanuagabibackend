const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const dbString = process.env.DATABASE_CONNECTION_STRING.replace(
	"<password>",
	process.env.DATABASE_CONNECTION_PASSWORD
);

mongoose.set("strictQuery", false);
mongoose
	.connect(dbString)
	.then((conn) => console.log(conn.connection._connectionString))
	.catch((err) => console.error(err));

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
	console.log(`app is running on port ${PORT}`);
});
