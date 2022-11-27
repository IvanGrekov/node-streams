import http from 'http';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import zlib from 'zlib';
import { checkIfPathIncludesExt } from './utils/url.utils.js';
import { pipeline } from 'stream';

dotenv.config();
console.clear();

const PORT = process.env.PORT || 3000;
const server = new http.Server();

server.on('request', (req, res) => {
    const {
        url,
        headers: { host },
    } = req;
    const { pathname } = new URL(url, `http://${host}`);
    const file = pathname.slice(1) || 'index.html';
    const filename = checkIfPathIncludesExt(file) ? file : `${file}.html`;

    const readFileStream = fs.createReadStream(path.resolve(`publicc/${filename}`));

    //#region without compressing
    // readFileStream.pipe(res);
    //#endregion

    //#region GzipCompress
    const gzipStream = zlib.createGzip();

    res.setHeader('Content-Encoding', 'gzip');

    // NOTE: way 1
    readFileStream.pipe(gzipStream);
    gzipStream.pipe(res);
    // gzipStream.pipe(fs.createWriteStream(path.resolve(`public/${file}.gzip`)));

    // NOTE: way 2
    // readFileStream.pipe(gzipStream).pipe(res);
    // gzipStream.pipe(fs.createWriteStream(path.resolve(`public/${file}.gzip`)));

    // NOTE: way 3
    // readFileStream
    //     .on('error', () => {})
    //     .pipe(gzipStream)
    //     .on('error', () => {})
    //     .pipe(res);

    // NOTE: way 4
    // pipeline(readFileStream, gzipStream, res, () => {});
    // gzipStream.pipe(fs.createWriteStream(path.resolve(`public/${file}.gzip`)));
    //#endregion

    //#region BrotliCompress
    // const brotliStream = zlib.createBrotliCompress();

    // res.setHeader('Content-Encoding', 'br');
    // readFileStream.pipe(brotliStream);
    // brotliStream.pipe(res);
    //#endregion

    res.on('close', () => {
        readFileStream.destroy();
    });
});

server.on('error', () => {
    console.log('Server error occurred');
});

server.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});
