"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Err_MESSAGES = exports.Err_CODES = void 0;
exports.Err_CODES = {
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    SUCCESSED: 200,
    CREATED: 201,
    SESSIONEXPIRED: 440
};
exports.Err_MESSAGES = {
    INTERNAL_SERVER_ERROR: 'Internal server error',
    UNAUTHORIZED: 'Unauthorized / Invalid ',
    NOT_FOUND: 'Resource not found',
    BAD_REQUEST: 'Bad request',
    SUCCESSED: 'Success',
    CREATED: 'Cretaed',
    SESSIONEXPIRED: 'Session expired'
};
