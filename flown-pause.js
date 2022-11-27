import http from 'http';
import fs from 'fs';
import path from 'path';

console.clear();

const PORT = 3000;
const server = new http.Server();

server.on('request', (req, res) => {
    const readFileStream = fs.createReadStream(path.resolve('public/large-file.txt'));

    // NOTE: required consumers to launch a readable stream (flowning)
    // readFileStream.pipe(res);
    // readFileStream.on('data', (chunk) => {
    //     console.log(chunk);
    // });
    // readFileStream.resume();

    // NOTE: a readable stream is paused without consumers
    // readFileStream.pause();
    // readFileStream.removeAllListeners('data');

    readFileStream.on('end', () => {
        console.log('readFileStream, end');
    });

    readFileStream.on('error', () => {
        res.statusCode = 400;
        res.end('error');
    });

    res.on('close', () => {
        readFileStream.destroy();
    });
});

server.on('error', () => {
    console.log('server error occurred');
});

server.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});
