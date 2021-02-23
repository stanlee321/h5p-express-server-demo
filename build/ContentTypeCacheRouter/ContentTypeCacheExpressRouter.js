"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expressErrorHandler_1 = require("../expressErrorHandler");
const ContentTypeCacheController_1 = __importDefault(require("./ContentTypeCacheController"));
function default_1(contentTypeCache, options = { handleErrors: true }, languageOverride = 'auto') {
    const router = express_1.Router();
    const controller = new ContentTypeCacheController_1.default(contentTypeCache);
    router.post(`/update`, expressErrorHandler_1.catchAndPassOnErrors(controller.postLibrariesContentTypeCacheUpdate, expressErrorHandler_1.undefinedOrTrue(options === null || options === void 0 ? void 0 : options.handleErrors)));
    router.get(`/update`, expressErrorHandler_1.catchAndPassOnErrors(controller.getLibrariesContentTypeCacheUpdate, expressErrorHandler_1.undefinedOrTrue(options === null || options === void 0 ? void 0 : options.handleErrors)));
    if (expressErrorHandler_1.undefinedOrTrue(options === null || options === void 0 ? void 0 : options.handleErrors)) {
        router.use(expressErrorHandler_1.errorHandler(languageOverride));
    }
    return router;
}
exports.default = default_1;
//# sourceMappingURL=ContentTypeCacheExpressRouter.js.map