require("dotenv").config();
const serverExpress = require("./api/app");
const connectDB = require("./api/config/db");
connectDB();
serverExpress.listen(process.env.PORT, () => {
    console.log(`Funcionando en: ${process.env.PORT}`);
});