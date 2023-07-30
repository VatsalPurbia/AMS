"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10)
});
sequelize.authenticate().then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log("Error occure in database connection");
});
sequelize.sync().then(() => {
    console.log("All table are created");
}).catch((err) => {
    console.log("Error occured table can't created");
});
exports.default = sequelize;
