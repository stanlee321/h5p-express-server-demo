"use strict";
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
const h5p_server_1 = require("@lumieducation/h5p-server");
class LibraryAdministrationExpressController {
    constructor(h5pEditor, libraryAdministration) {
        this.h5pEditor = h5pEditor;
        this.libraryAdministration = libraryAdministration;
        /**
         * Deletes a library.
         *
         * Used HTTP status codes:
         * - 204 if successful
         * - 400 if library name is not a valid ubername
         * - 404 if library does not exist
         * - 423 if the library can't be deleted because it is used by content
         */
        this.deleteLibrary = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.libraryAdministration.deleteLibrary(req.params.ubername);
            res.status(204).send();
        });
        /**
         * Returns a list of all installed libraries.
         *
         * Used HTTP status codes:
         * - 200 if successful
         * - 500 if there was an error inside the library
         */
        this.getLibraries = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const libraries = yield this.libraryAdministration.getLibraries();
            res.status(200).json(libraries);
        });
        /**
         * Returns detailed information about a library.
         *
         * Used HTTP status codes:
         * - 200 if successful
         * - 400 if library name is not a valid ubername
         * - 404 if the library was not found
         * - 500 if there was an internal error
         */
        this.getLibrary = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const libraryDetails = yield this.libraryAdministration.getLibrary(req.params.ubername);
            res.status(200).json(libraryDetails);
        });
        /**
         * Changes the status of a library. Can currently only be used to set
         * libraries to restricted or back.
         *
         * Used HTTP status codes:
         * - 204 if successful
         * - 400 if library name is not a valid ubername
         * - 404 if the library was not found
         * - 500 if there was an internal error
         */
        this.patchLibrary = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.libraryAdministration.restrictLibrary(req.params.ubername, req.body.restricted);
            res.status(204).send();
        });
        /**
         * Uploads H5P packages and installs the libraries inside it. Ignores
         * content in the package.
         *
         * Used HTTP status codes:
         * - 200 if successful
         * - 400 if there was a validation error in the package
         * - 500 if there was an internal error
         */
        this.postLibraries = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!((_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file) === null || _b === void 0 ? void 0 : _b.data)) {
                throw new h5p_server_1.H5pError('malformed-request', {}, 400);
            }
            const { installedLibraries } = yield this.h5pEditor.uploadPackage(req.files.file.data, undefined, {
                onlyInstallLibraries: true
            });
            res.status(200).json({
                installed: installedLibraries.filter((l) => l.type === 'new')
                    .length,
                updated: installedLibraries.filter((l) => l.type === 'patch').length
            });
        });
    }
}
exports.default = LibraryAdministrationExpressController;
//# sourceMappingURL=LibraryAdministrationController.js.map