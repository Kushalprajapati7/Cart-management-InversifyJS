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
exports.CartController = void 0;
const inversify_1 = require("inversify");
const cartServices_1 = require("../services/cartServices");
const error_1 = require("../config/error");
const inversify_express_utils_1 = require("inversify-express-utils");
const ProductModel_1 = require("../models/ProductModel");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
let CartController = class CartController {
    constructor(CartService) {
        this.CartService = CartService;
    }
    createCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("Inside Cart Post");
                const { profileId, items } = req.body;
                const userId = req.userId;
                // console.log(userId);
                let total = 0;
                if (!userId) {
                    res.status(error_1.Err_CODES.SESSIONEXPIRED).send(error_1.Err_MESSAGES.SESSIONEXPIRED + " Login again ");
                    console.log("User ID is missing.");
                }
                for (const item of items) {
                    const product = yield ProductModel_1.ProductModel.findById(item.productId);
                    if (!product) {
                        throw new Error(`Product with ID ${item.productId} not found`);
                    }
                    total += product.price * item.quantity;
                    item.name = product.name;
                    item.description = product.description;
                    item.price = product.price;
                }
                const newCart = yield this.CartService.createCart(userId, profileId, items, total);
                res.status(error_1.Err_CODES.SUCCESSED).json(newCart);
            }
            catch (error) {
                console.error("Error creating Cart:", error);
                res.status(error_1.Err_CODES.INTERNAL_SERVER_ERROR).send(error_1.Err_MESSAGES.INTERNAL_SERVER_ERROR);
            }
        });
    }
    updateCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = req.userId;
                if (!userID) {
                    throw new Error("User ID is missing.");
                }
                const id = req.params.id;
                const { profileId, items } = req.body;
                let total = 0;
                for (const item of items) {
                    const product = yield ProductModel_1.ProductModel.findById(item.productId);
                    if (!product) {
                        res.status(error_1.Err_CODES.NOT_FOUND).json({ message: `Product with ID ${item.productId} not found` });
                        return;
                    }
                    total += product.price * item.quantity;
                    item.name = product.name;
                    item.description = product.description;
                    item.price = product.price;
                }
                const updatedCart = yield this.CartService.updateCart(id, profileId, items, total);
                res.status(error_1.Err_CODES.SUCCESSED).json(updatedCart);
            }
            catch (error) {
                console.error("Error Updating Cart:", error);
                res.status(error_1.Err_CODES.INTERNAL_SERVER_ERROR).send(error_1.Err_MESSAGES.INTERNAL_SERVER_ERROR);
            }
        });
    }
    deleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                if (!userId) {
                    console.log("Session in Expired");
                    // res.status(Err_CODES.SESSIONEXPIRED).send(Err_MESSAGES.SESSIONEXPIRED)
                }
                const { id } = req.params;
                const deleteCart = yield this.CartService.deleteCart(id);
                if (!deleteCart) {
                    res.status(error_1.Err_CODES.SUCCESSED).send(error_1.Err_MESSAGES.SUCCESSED);
                }
                else {
                    res.status(error_1.Err_CODES.NOT_FOUND).send(error_1.Err_MESSAGES.NOT_FOUND);
                }
            }
            catch (error) {
                console.log("Error While Deleteing the cart", error);
                res.status(error_1.Err_CODES.INTERNAL_SERVER_ERROR).send(error_1.Err_MESSAGES.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
exports.CartController = CartController;
__decorate([
    (0, inversify_express_utils_1.httpPost)("/", authMiddleware_1.default),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "createCart", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)('/:id', authMiddleware_1.default),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateCart", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)('/:id', authMiddleware_1.default),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteCart", null);
exports.CartController = CartController = __decorate([
    (0, inversify_express_utils_1.controller)("/cart"),
    __param(0, (0, inversify_1.inject)("CartService")),
    __metadata("design:paramtypes", [cartServices_1.CartService])
], CartController);
