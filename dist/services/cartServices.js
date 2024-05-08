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
exports.CartService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const CartModel_1 = require("../models/CartModel");
let CartService = class CartService {
    createCart(userId, profileId, items, total) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield CartModel_1.CartModel.create({ userId, profileId, items, total });
            return cart;
        });
    }
    updateCart(id, profileId, items, total) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCart = yield CartModel_1.CartModel.findByIdAndUpdate(id, { profileId, items, total }, { new: true });
            return updatedCart;
        });
    }
    deleteCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield CartModel_1.CartModel.findByIdAndDelete(id);
        });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, inversify_1.injectable)()
], CartService);
