const { connect } = require("mongoose");

module.exports = connectDB = () => {
	try {
		connect(process.env.MONGODB_URI);
		console.log("db conect")
	} catch (e) {
		console.log(e);
	}
};