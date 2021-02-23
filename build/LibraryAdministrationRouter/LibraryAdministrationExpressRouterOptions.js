"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Allows you to choose which routes you want in the Express Router
 */
class LibraryAdministrationExpressRouterOptions {
    constructor() {
        this.handleErrors = true;
        this.routeDeleteLibrary = true;
        this.routeGetLibraries = true;
        this.routeGetLibrary = true;
        this.routePatchLibrary = true;
        this.routePostLibraries = true;
    }
}
exports.default = LibraryAdministrationExpressRouterOptions;
//# sourceMappingURL=LibraryAdministrationExpressRouterOptions.js.map