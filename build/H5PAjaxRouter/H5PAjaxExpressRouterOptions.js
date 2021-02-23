"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Allows you to choose which routes you want in the Express Router
 */
class H5PAjaxExpressRouterOptions {
    constructor() {
        this.handleErrors = true;
        this.routeCoreFiles = true;
        this.routeEditorCoreFiles = true;
        this.routeGetAjax = true;
        this.routeGetContentFile = true;
        this.routeGetDownload = true;
        this.routeGetLibraryFile = true;
        this.routeGetParameters = true;
        this.routeGetTemporaryContentFile = true;
        this.routePostAjax = true;
    }
}
exports.default = H5PAjaxExpressRouterOptions;
//# sourceMappingURL=H5PAjaxExpressRouterOptions.js.map