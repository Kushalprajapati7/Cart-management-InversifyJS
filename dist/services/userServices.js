"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UserService = void 0;
const inversify_1 = require("inversify");
const UserModel_1 = require("../models/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
require("reflect-metadata");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let UserService = class UserService {
    createUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPass = yield bcrypt_1.default.hash(password, 10);
            yield UserModel_1.UserModel.create({ username, password: hashedPass });
        });
    }
    loginUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.UserModel.findOne({ username });
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, 'KushalP', { expiresIn: '1h' });
            return token;
        });
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.UserModel.findOne({ username });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield UserModel_1.UserModel.find({});
            return users;
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, inversify_1.injectable)()
], UserService);
