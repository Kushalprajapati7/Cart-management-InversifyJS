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
exports.ProductController = void 0;
// controllers/userController.ts
const inversify_1 = require("inversify");
const productServices_1 = require("../services/productServices");
const inversify_express_utils_1 = require("inversify-express-utils");
const error_1 = require("../config/error");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
// @injectable()
let ProductController = class ProductController {
    constructor(ProductService) {
        this.ProductService = ProductService;
    }
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                if (!userId) {
                    res.status(error_1.Err_CODES.SESSIONEXPIRED).send(error_1.Err_CODES.SESSIONEXPIRED);
                    return;
                }
                const product = yield this.ProductService.getAllProducts();
                res.status(error_1.Err_CODES.SUCCESSED).json(product);
            }
            catch (error) {
                console.log("Error while retriving Products", error);
                res.status(error_1.Err_CODES.INTERNAL_SERVER_ERROR).send(error_1.Err_MESSAGES.INTERNAL_SERVER_ERROR);
            }
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                if (!userId) {
                    res.status(error_1.Err_CODES.SESSIONEXPIRED).send(error_1.Err_CODES.SESSIONEXPIRED);
                    return;
                }
                const { name, description, price, stock } = req.body;
                console.log(req.body);
                const newProduct = yield this.ProductService.createProduct(name, description, price, stock);
                res.status(error_1.Err_CODES.SUCCESSED).json(newProduct);
            }
            catch (error) {
                console.log("Error while Adding Products", error);
                res.status(error_1.Err_CODES.INTERNAL_SERVER_ERROR).send(error_1.Err_MESSAGES.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/', authMiddleware_1.default),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, inversify_express_utils_1.controller)("/Product", authMiddleware_1.default),
    __param(0, (0, inversify_1.inject)('ProductService')),
    __metadata("design:paramtypes", [productServices_1.ProductService])
], ProductController);
