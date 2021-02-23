"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const h5p_server_1 = require("@lumieducation/h5p-server");
const LibraryAdministrationController_1 = __importDefault(require("./LibraryAdministrationController"));
const LibraryAdministrationExpressRouterOptions_1 = __importDefault(require("./LibraryAdministrationExpressRouterOptions"));
const expressErrorHandler_1 = require("../expressErrorHandler");
function default_1(h5pEditor, routeOptions = new LibraryAdministrationExpressRouterOptions_1.default(), languageOverride = 'auto') {
    const router = express_1.Router();
    const controller = new LibraryAdministrationController_1.default(h5pEditor, new h5p_server_1.LibraryAdministration(h5pEditor.libraryManager, h5pEditor.contentManager));
    if (expressErrorHandler_1.undefinedOrTrue(routeOptions.routeGetLibraries)) {
        router.get(`/`, expressErrorHandler_1.catchAndPassOnErrors(controller.getLibraries, routeOptions.handleErrors));
    }
    if (expressErrorHandler_1.undefinedOrTrue(routeOptions.routePostLibraries)) {
        router.post(`/`, expressErrorHandler_1.catchAndPassOnErrors(controller.postLibraries, routeOptions.handleErrors));
    }
    if (expressErrorHandler_1.undefinedOrTrue(routeOptions.routeGetLibrary)) {
        router.get(`/:ubername`, expressErrorHandler_1.catchAndPassOnErrors(controller.getLibrary, routeOptions.handleErrors));
    }
    if (expressErrorHandler_1.undefinedOrTrue(routeOptions.routePatchLibrary)) {
        router.patch(`/:ubername`, expressErrorHandler_1.catchAndPassOnErrors(controller.patchLibrary, routeOptions.handleErrors));
    }
    if (expressErrorHandler_1.undefinedOrTrue(routeOptions.routeDeleteLibrary)) {
        router.delete(`/:ubername`, expressErrorHandler_1.catchAndPassOnErrors(controller.deleteLibrary, routeOptions.handleErrors));
    }
    if (expressErrorHandler_1.undefinedOrTrue(routeOptions.handleErrors)) {
        router.use(expressErrorHandler_1.errorHandler(languageOverride));
    }
    return router;
}
exports.default = default_1;
//# sourceMappingURL=LibraryAdministrationExpressRouter.js.map