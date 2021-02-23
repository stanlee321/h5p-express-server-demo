"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.contentTypeCacheExpressRouter = exports.libraryAdministrationExpressRouter = exports.h5pAjaxExpressRouter = void 0;
const H5PAjaxExpressRouter_1 = __importDefault(require("./H5PAjaxRouter/H5PAjaxExpressRouter"));
exports.h5pAjaxExpressRouter = H5PAjaxExpressRouter_1.default;
const LibraryAdministrationExpressRouter_1 = __importDefault(require("./LibraryAdministrationRouter/LibraryAdministrationExpressRouter"));
exports.libraryAdministrationExpressRouter = LibraryAdministrationExpressRouter_1.default;
const ContentTypeCacheExpressRouter_1 = __importDefault(require("./ContentTypeCacheRouter/ContentTypeCacheExpressRouter"));
exports.contentTypeCacheExpressRouter = ContentTypeCacheExpressRouter_1.default;
const H5P = __importStar(require("@lumieducation/h5p-server"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const createH5PEditor_1 = __importDefault(require("./createH5PEditor"));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    //options for cors midddleware
    const options = {
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'X-Access-Token',
        ],
        credentials: false,
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        origin: "*",
        preflightContinue: false,
    };
    // Load the configuration file from the local file system
    const config = yield new H5P.H5PConfig(new H5P.fsImplementations.JsonStorage(path_1.default.resolve('src/config.json'))).load();
    const h5pEditor = yield createH5PEditor_1.default(config, path_1.default.resolve('h5p/libraries'), // the path on the local disc where
    // libraries should be stored)
    path_1.default.resolve('h5p/content'), // the path on the local disc where content
    // is stored. Only used / necessary if you use the local filesystem
    // content storage class.
    path_1.default.resolve('h5p/temporary-storage'));
    // We now set up the Express server in the usual fashion.
    const server = express_1.default();
    // req: express.Request<{
    //     contentId: string;
    //     dataType: string;
    //     subContentId: string;
    // }>,
    server.get('/', (req, res) => res.send('Express + TypeScript Server...'));
    server.use(h5pEditor.config.baseUrl);
    // Content Model
    server.get('/contentModel', cors_1.default(options), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        h5pEditor.setRenderer((mod) => mod);
        const model = yield h5pEditor.render(undefined);
        //console.log(model)
        // console.log(model)
        res.send(model);
        res.status(200).end();
    }));
    server.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body.contentId ||
            !req.body.requestBody.library ||
            !req.body.requestBody.params) {
            res.status(400).send('Malformed request').end();
            return;
        }
        const c = yield h5pEditor.getContent(undefined);
        const content = yield h5pEditor.saveOrUpdateContentReturnMetaData(req.body.contentId, c.params.params, c.params.metadata, "---", undefined);
        res.send(JSON.stringify(Object.assign({}, content)));
        res.status(200).end();
    }));
    const port = process.env.PORT || '8080';
    // For developer convenience we display a list of IPs, the server is running
    // on. You can then simply click on it in the terminal.
    // displayIps(port);
    server.listen(port);
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    // We can't use await outside a an async function, so we use the start()
    // function as a workaround.
});
start();
//# sourceMappingURL=index.js.map