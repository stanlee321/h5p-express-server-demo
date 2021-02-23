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
exports.errorHandler = exports.catchAndPassOnErrors = exports.undefinedOrTrue = void 0;
const h5p_server_1 = require("@lumieducation/h5p-server");
const h5p_server_2 = require("@lumieducation/h5p-server");
function undefinedOrTrue(option) {
    return option === undefined || option;
}
exports.undefinedOrTrue = undefinedOrTrue;
/**
 * Calls the function passed to it and catches errors it throws. These errors
 * are then passed to the next(...) function for proper error handling.
 * You can disable error catching by setting options.handleErrors to false
 * @param fn The function to call
 * @param handleErrors whether to handle errors
 */
exports.catchAndPassOnErrors = (fn, handleErrors) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (undefinedOrTrue(handleErrors)) {
        try {
            return yield fn(req, res);
        }
        catch (error) {
            return next(error);
        }
    }
    return fn(req, res);
});
/**
 * An Express middleware that converts NodeJs error objects into error
 * responses the H5P client can understand. Add this middleware as the last
 * entry in your express application and make sure all routes don't throw errors
 * but pass them to the next(...) function. (You must do this manually in async functions!)
 * @param languageOverride the language to use when returning errors.
 * Only has an effect if you use the i18next http middleware, as it relies on
 * req.i18n.changeLanguage to be present. Defaults to auto, which means the
 * a language detector must have detected language and req.t translated to the
 * detected language.
 */
// tslint:disable-next-line: typedef
function errorHandler(languageOverride = 'auto') {
    return (err, req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let statusCode = 500;
        let statusText = '';
        let detailsList;
        let clientErrorId = '';
        if (err instanceof h5p_server_2.H5pError) {
            if (req.t &&
                req.i18n &&
                languageOverride &&
                languageOverride !== 'auto') {
                yield req.i18n.changeLanguage(languageOverride);
            }
            statusCode = err.httpStatusCode;
            statusText =
                req.t === undefined
                    ? err.errorId
                    : req.t(err.errorId, err.replacements);
            clientErrorId = err.clientErrorId || '';
            if (err instanceof h5p_server_1.AggregateH5pError) {
                detailsList = err.getErrors().map((e) => {
                    return {
                        code: e.errorId,
                        message: req.t === undefined
                            ? e.errorId
                            : req.t(e.errorId, e.replacements)
                    };
                });
            }
        }
        else {
            statusText = err.message;
        }
        res.status(statusCode).json(new h5p_server_1.AjaxErrorResponse(clientErrorId, statusCode, statusText, detailsList));
    });
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=expressErrorHandler.js.map