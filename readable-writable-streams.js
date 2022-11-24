import http from 'http';
import fs from 'fs';
import { Readable, Writable } from 'stream';
import path from 'path';

console.clear();

const PORT = 4000;
const server = new http.Server();

server.on('request', (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    for (let i = 6; i > 1; i--) {
        setTimeout(() => {
            res.write(`<h${i}>${i - 1}</h${i}>`);

            if (i === 2) {
                setTimeout(() => {
                    res.end('<h1>Done</h1>');
                }, 1000);
            }
        }, (6 - i) * 1000);
    }
});

server.on('error', (err) => {
    console.log('error occurred', err.message);
});

server.listen(PORT, () => {
    console.log(`server is running, http://localhost:${PORT}`);
});

// process.stdin.pipe(process.stdout);
// process.stdin.pipe(process.stderr);

// const writableStream = fs.createWriteStream(path.resolve('public/new-file.txt'));
// process.stdin.pipe(writableStream);

// const writableStream = fs.createWriteStream(path.resolve('public/new-file.txt'));
// process.stdin.on('data', (chunk) => {
//     const stringChunk = chunk.toString();

//     if (stringChunk.startsWith('a')) {
//         writableStream.write(stringChunk);
//     }
// });

// NOTE: 'finish' for Writable stream (res)
// NOTE: 'end' for Readable stream (req)
