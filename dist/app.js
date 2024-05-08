"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("reflect-metadata");
const body_parser_1 = __importDefault(require("body-parser"));
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_config_1 = require("./inversify.config");
const PORT = 3000;
const MONGO_URI = 'mongodb+srv://kushal:kushal123@backenddb.yac2nn2.mongodb.net/KP';
let server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.container);
server.setConfig((app) => {
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
});
let app = server.build();
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to Database ');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('MongoDB connection failed:', error);
        process.exit();
    });
