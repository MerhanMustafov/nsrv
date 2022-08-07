const mongoose = require("mongoose");
const { DB_CONNECTION_STRING } = require("./");
module.exports = (app) => {
	return new Promise((resolve, reject) => {
		mongoose.connect(DB_CONNECTION_STRING, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		const db = mongoose.connection;

		db.on("error", (err) => {
			console.error("DB error: ", err.message);
			reject();
		});
		db.once("open", () => {
			console.log("DB on: ", DB_CONNECTION_STRING);
			resolve();
		});
	});
};
