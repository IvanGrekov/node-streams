import http from 'http';
import fs from 'fs';
import path from 'path';

console.clear();

const PORT = 3000;
const server = new http.Server();

server.on('request', (req, res) => {
    if (req.url === '/favicon.ico') {
        res.end('icon');

        return;
    }

    res.setHeader('Content-Type', 'text/html');
    const readFileStream = fs.createReadStream(path.resolve('public/large-file.txt'));

    readFileStream.pipe(res);

    // readFileStream.on('open', () => {
    //     console.log('open readFileStream');
    // });

    // readFileStream.on('close', () => {
    //     console.log('close readFileStream');
    // });

    res.on('close', () => {
        console.log('close res');
        readFileStream.destroy();
    });

    // res.on('finish', () => {
    //     console.log('finish res');
    // });

    readFileStream.on('error', () => {
        res.statusCode = 404;
        res.end('err');
    });
});

server.listen(PORT, () => {});
