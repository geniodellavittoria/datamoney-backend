import cookieParser from 'cookie-parser';
import express from 'express';
import {Request, Response} from 'express';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import authRouter from './routes/auth-router';
import userRouter from './routes/user-router';
import ipfsFileService from './ipfs/ipfs-file-service';
import request from 'request';
import {Entries} from './ipfs/ipfsModels';

request.debug = true;
// Init express
const port = 3000;
const app = express();

// view engine setup

// app.use(logger('dev'));
const whitelist = ['http://localhost', 'http://localhost:4200'];
const corsOptions = {
    origin(origin: any, callback: any) {
        // if (whitelist.indexOf(origin) !== -1 || origin == null) {
        callback(null, true);
        // } else {
        //     callback(new Error('Not allowed by CORS'));
        // }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
};

app.use(cors(corsOptions));

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', authRouter);
app.use('/api/v1/user', userRouter);

// const IPFS = require('ipfs');
const ipfsClient = require('ipfs-http-client');
// const ipfsClient = require('ipfs');
const ipfs = ipfsClient({
    host: 'localhost',
    port: '5001',
    protocol: 'http',
});
// const ipfs = ipfsClient('/ip4/127.0.0.1/tcp/5001');
// const ipfs = ipfsClient('http://localhost:5001');
app.post('/upload', async (req, res) => {
    const data = req.body;
    console.log(data);
    // main();
    const cid = 'QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn';
    // ipfs.get(cid, (err, files) => {
    //     if (err) return console.log(err);
    //     console.log(files); // two files, folder and cat.gif
    // });
    request.get({url: path}, (error, resp, body) => {
        if (error) {
            console.log(error);
        }
        const entries = body as Entries;
    });

    // ipfs.add(Buffer.from(JSON.stringify({test: 1})), {
    //     progress: (prog) => {
    //         console.log(`received: ${prog}`);
    //     },
    // }).then(res => {
    //     console.log(res);
    //     res.send(`http://localhost:5001/ipfs/${res}`);
    // }).catch(err => {
    //     console.log(err);
    //     res.send('Error');
    // });


    // const fileHash = await addFile(data);
    // return res.send(`http://localhost:5001/ipfs/${fileHash}`);
});

async function main() {
    const node = await IPFS.create();
    const version = await node.version();

    console.log('Version:', version.version);

    const filesAdded = await node.add({
        path: 'hello.txt',
        content: 'Hello World 101',
    });

    console.log('Added file:', filesAdded[0].path, filesAdded[0].hash);
    // ...
}

const addFile = async ({path, content}) => {
    const file = {path, content};
    // const fileAdded = await ipfs.add(file);
    // return fileAdded[0].hash;
};

// Export express instance
export default app;
