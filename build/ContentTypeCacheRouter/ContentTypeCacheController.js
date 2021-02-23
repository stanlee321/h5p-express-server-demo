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
class ContentTypeCacheController {
    constructor(contentTypeCache) {
        this.contentTypeCache = contentTypeCache;
        /**
         * Returns the last update of the content type cache.
         */
        this.getLibrariesContentTypeCacheUpdate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const lastUpdate = yield this.contentTypeCache.getLastUpdate();
            res.status(200).json({
                lastUpdate: lastUpdate === undefined ? null : lastUpdate
            });
        });
        /**
         * Manually updates the content type cache by contacting the H5P Hub and
         * fetching the metadata about the available content types.
         *
         * Used HTTP status codes:
         * - 200 if successful
         * - 502 if the H5P Hub is unreachable
         * - 500 if there was an internal error
         */
        this.postLibrariesContentTypeCacheUpdate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.contentTypeCache.forceUpdate();
            const lastUpdate = yield this.contentTypeCache.getLastUpdate();
            res.status(200).json({ lastUpdate });
        });
    }
}
exports.default = ContentTypeCacheController;
//# sourceMappingURL=ContentTypeCacheController.js.map