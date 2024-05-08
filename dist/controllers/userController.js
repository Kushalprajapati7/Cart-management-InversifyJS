"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const inversify_1 = require("inversify");
const userServices_1 = require("../services/userServices");
const inversify_express_utils_1 = require("inversify-express-utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
let userController = class userController {
    constructor(userService) {
        this.userService = userService;
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                yield this.userService.createUser(username, password);
                res.status(200).send("User Created Successfully");
            }
            catch (error) {
                console.log('Error while signUp');
                res.status(500).json({ message: error });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield this.userService.getUserByUsername(username);
                if (!user) {
                    res.status(401).json({ error: 'Authentication failed' });
                    return;
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordMatch) {
                    res.status(401).json({ error: 'Authentication failed' });
                    return;
                }
                const token = jsonwebtoken_1.default.sign({ userId: user._id }, 'KushalP', { expiresIn: '1h' });
                res.status(200).json({ token });
            }
            catch (error) {
                console.error("Error logging in");
                res.status(500).json({ message: error });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAllUsers();
                res.status(200).json(users);
            }
            catch (error) {
                console.error("Error retrieving users:", error);
                res.status(500).send('Failed to retrieve users');
            }
        });
    }
};
exports.userController = userController;
__decorate([
    (0, inversify_express_utils_1.httpPost)('/signup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "createUser", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/login"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "loginUser", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/', authMiddleware_1.default),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "getAllUsers", null);
exports.userController = userController = __decorate([
    (0, inversify_express_utils_1.controller)("/users"),
    __param(0, (0, inversify_1.inject)('UserService')),
    __metadata("design:paramtypes", [userServices_1.UserService])
], userController);
