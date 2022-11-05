import * as dotenv from 'dotenv';
dotenv.config();
console.clear();

import { Server } from 'http';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { pipeline } from 'stream';

const { PORT } = process.env;
const server = new Server();

const return500page = (res) => {
    res.statusCode = 500;
    res.end('<h1>We are sorry! 500 Error');
};

const return404page = (res) => {
    fs.readFile(path.resolve('public', '404.html'), (err, data) => {
        if (err) {
            return500page(res);
        } else {
            res.statusCode = 404;
            res.end(data);
        }
    });
};

server.on('request', (req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const fileName = pathname.slice(1) || 'index.html';
    const filePath = path.resolve('public', fileName);

    if (!fs.existsSync(filePath)) {
        return404page(res);

        return;
    }

    const readFileStream = fs.createReadStream(filePath);

    // NOTE: gzip encoding (almost all browsers support)
    const gzipStream = zlib.createGzip();
    res.setHeader('Content-Encoding', 'gzip');
    // readFileStream
    //     .on('error', (err) => console.log('err', err))
    //     .pipe(gzipStream)
    //     .on('error', (err) => console.log('err', err))
    //     .pipe(res)
    //     .on('error', (err) => console.log('err', err));
    // NOTE: pipeline instead of chain
    pipeline(readFileStream, gzipStream, res, (err) => {
        if (err) {
            console.log('Pipeline error', err);
            return500page(res);
        }
    });

    // NOTE: we can write to several streams from one readable stream
    // gzipStream.pipe(fs.createWriteStream(filePath + '.gzip'));

    // NOTE: brotli encoding
    // const brotliStream = zlib.createBrotliCompress();
    // res.setHeader('Content-Encoding', 'br');
    // readFileStream.pipe(brotliStream);
    // brotliStream.pipe(res);

    res.on('close', () => {
        readFileStream.destroy();
    });
});

server.on('error', (err) => {
    console.log('ServerError', err);
});

server.listen(PORT, () => {
    console.log(`Server launched on ${PORT} port`);
});
