import {
    IRequestWithLanguage,
    IRequestWithUser,
    IRequestWithTranslator,
    IActionRequest
} from './expressTypes';
import h5pAjaxExpressRouter from './H5PAjaxRouter/H5PAjaxExpressRouter';
import libraryAdministrationExpressRouter from './LibraryAdministrationRouter/LibraryAdministrationExpressRouter';
import contentTypeCacheExpressRouter from './ContentTypeCacheRouter/ContentTypeCacheExpressRouter';

import * as H5P from '@lumieducation/h5p-server';



export {
    IRequestWithLanguage,
    IRequestWithUser,
    IRequestWithTranslator,
    IActionRequest,
    h5pAjaxExpressRouter,
    libraryAdministrationExpressRouter,
    contentTypeCacheExpressRouter
};

import express from 'express';
import cors from 'cors';
import path from 'path';


import createH5PEditor from './createH5PEditor'

const start = async () => {


    //options for cors midddleware
    const options: cors.CorsOptions = {
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'X-Access-Token',
        ],
        credentials: false,
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        origin: "*", //"API_URL",
        preflightContinue: false,
    };



    // Load the configuration file from the local file system
    const config = await new H5P.H5PConfig(
        new H5P.fsImplementations.JsonStorage(path.resolve('src/config.json'))
    ).load();


    const h5pEditor: H5P.H5PEditor = await createH5PEditor(
        config,
        path.resolve('./h5p/libraries'), // the path on the local disc where
        // libraries should be stored)
        path.resolve('./h5p/content'), // the path on the local disc where content
        // is stored. Only used / necessary if you use the local filesystem
        // content storage class.
        path.resolve('./h5p/temporary-storage'), // the path on the local disc
        // where temporary files (uploads) should be stored. Only used /
        // necessary if you use the local filesystem temporary storage class.

    );
    
    const routes = h5pAjaxExpressRouter(
        h5pEditor,
        path.resolve('./h5p/core'), // the path on the local disc where the
        // files of the JavaScript client of the player are stored
        path.resolve('./h5p/editor'), // the path on the local disc where the
        // files of the JavaScript client of the editor are stored
        undefined,
        'auto' // You can change the language of the editor here by setting
        // the language code you need here. 'auto' means the route will try
        // to use the language detected by the i18next language detector.
        )

    // We now set up the Express server in the usual fashion.
    const server = express();

    // req: express.Request<{
    //     contentId: string;
    //     dataType: string;
    //     subContentId: string;
    // }>,


    server.get('/', (req, res) => res.send('Express + TypeScript Server...'));

    server.use(
        h5pEditor.config.baseUrl,
        routes
    );


    // Content Model
    server.get('/contentModel', cors(options), async (req, res) => {
    
        
        h5pEditor.setRenderer((mod) => mod)

        const model = await h5pEditor.render(
            undefined,
        );

        //console.log(model)
        // console.log(model)
        res.send(model);
        res.status(200).end();
    });


    server.post('/new', async (req, res) => {
        if (
            !req.body.contentId ||
            !req.body.requestBody.library ||
            !req.body.requestBody.params
        ) {
            res.status(400).send('Malformed request').end();
            return;
        }
        const c = await h5pEditor.getContent(undefined)
        
        const content = await h5pEditor.saveOrUpdateContentReturnMetaData(
            req.body.contentId,
            c.params.params,
            c.params.metadata,
            "---",
            undefined

        );

        res.send(JSON.stringify({...content  }));
        res.status(200).end();
    });


    const port = process.env.PORT || '8080';

    // For developer convenience we display a list of IPs, the server is running
    // on. You can then simply click on it in the terminal.
    // displayIps(port);

    server.listen(port);

    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    // We can't use await outside a an async function, so we use the start()
    // function as a workaround.

}


start()