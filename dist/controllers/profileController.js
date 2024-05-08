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
exports.ProfileController = void 0;
// controllers/ProfileController.ts
const inversify_1 = require("inversify");
const profileServices_1 = require("../services/profileServices");
const inversify_express_utils_1 = require("inversify-express-utils");
const error_1 = require("../config/error");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
// @injectable()
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    createProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, age } = req.body;
                const userId = req.userId;
                yield this.profileService.createProfile(name, age, userId);
                res.status(error_1.Err_CODES.CREATED).send("Profile created successfully");
            }
            catch (error) {
                console.error("Error creating profile:", error);
                res.status(error_1.Err_CODES.INTERNAL_SERVER_ERROR).send(error_1.Err_MESSAGES.INTERNAL_SERVER_ERROR);
            }
        });
    }
    getProfiles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const userID = this.getUserIdFromSession(req);
                // if (!userID) {
                //     res.status(Err_CODES.SESSIONEXPIRED).send(Err_CODES.SESSIONEXPIRED);
                //     return;
                // }
                const userId = req.userId;
                const profiles = yield this.profileService.getProfiles();
                const userProfiles = profiles.filter(profile => profile.userId.toString() === userId);
                res.status(error_1.Err_CODES.SUCCESSED).json(userProfiles);
            }
            catch (error) {
                console.log("Error while Retriving Profile", error);
                res.status(error_1.Err_CODES.INTERNAL_SERVER_ERROR).send(error_1.Err_MESSAGES.INTERNAL_SERVER_ERROR);
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const userID = this.getUserIdFromSession(req);
                // if (!userID) {
                //     res.status(Err_CODES.SESSIONEXPIRED).send(Err_CODES.SESSIONEXPIRED);
                //     return;
                // }
                const userId = req.userId;
                if (!userId) {
                    res.status(error_1.Err_CODES.SESSIONEXPIRED).send(error_1.Err_CODES.SESSIONEXPIRED);
                    return;
                }
                const profileId = req.params.id;
                const { name, age } = req.body;
                const profile = yield this.profileService.updateProfile(profileId, name, age);
                console.log(profile);
                res.status(error_1.Err_CODES.SUCCESSED).json(profile);
            }
            catch (error) {
                console.log("Error while Updating Profile", error);
                res.status(error_1.Err_CODES.INTERNAL_SERVER_ERROR).send(error_1.Err_MESSAGES.INTERNAL_SERVER_ERROR);
            }
        });
    }
    deleteProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = req.userId;
                if (!userID) {
                    res.status(error_1.Err_CODES.SESSIONEXPIRED).send(error_1.Err_CODES.SESSIONEXPIRED);
                    return;
                }
                const { id } = req.params;
                const deletedProfile = this.profileService.deleteProfile(id);
                // console.log(deletedProfile);    
                res.status(error_1.Err_CODES.SUCCESSED).send(error_1.Err_MESSAGES.SUCCESSED);
            }
            catch (error) {
                console.log("Error While deleteing Profile ", error);
                res.status(error_1.Err_CODES.INTERNAL_SERVER_ERROR).send(error_1.Err_MESSAGES.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, inversify_express_utils_1.httpPost)("/", authMiddleware_1.default),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "createProfile", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/", authMiddleware_1.default),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getProfiles", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)('/:id', authMiddleware_1.default),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateProfile", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)('/:id', authMiddleware_1.default),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deleteProfile", null);
exports.ProfileController = ProfileController = __decorate([
    (0, inversify_express_utils_1.controller)("/profile"),
    __param(0, (0, inversify_1.inject)("ProfileService")),
    __metadata("design:paramtypes", [profileServices_1.ProfileService])
], ProfileController);
