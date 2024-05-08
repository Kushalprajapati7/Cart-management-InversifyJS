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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const inversify_1 = require("inversify");
const ProfileModel_1 = require("../models/ProfileModel");
require("reflect-metadata");
let ProfileService = class ProfileService {
    createProfile(name, age, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ProfileModel_1.ProfileModel.create({ name, age, userId });
        });
    }
    getProfiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield ProfileModel_1.ProfileModel.find({});
            return profile;
        });
    }
    updateProfile(id, name, age) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield ProfileModel_1.ProfileModel.findByIdAndUpdate(id, { name, age }, { new: true });
            return profile;
        });
    }
    deleteProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield ProfileModel_1.ProfileModel.findByIdAndDelete(id);
            // return profile;
        });
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, inversify_1.injectable)()
], ProfileService);
