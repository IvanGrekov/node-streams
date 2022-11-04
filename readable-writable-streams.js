import { Server } from 'http';
import { Readable, Writable } from 'stream';
import { createReadStream, createWriteStream } from 'fs';

const PORT = 3000;
const server = new Server();

server.on('request', (req, res) => {
    // NOTE: Readable streams
    // new Readable();
    // createReadStream('./public/test-video.mp4');
    // process.stdin
    // req

    // NOTE: Writable streams
    // new Writable();
    // createWriteStream('./public/my-video.txt');
    // process.stdout
    // process.stderr
    // res

    res.setHeader('Content-Type', 'text/html');

    for (let i = 5; i > 0; i--) {
        const element = `h${i}`;

        setTimeout(() => {
            res.write(`<${element}>${i}</${element}>`);
        }, (6 - i) * 1000);
    }

    setTimeout(() => {
        res.end('<h1>Done<h1>');
    }, 6000);

    // NOTE: 'end' for Readable stream
    res.on('finish', () => {
        console.log('Writing res finished');
    });
});

server.on('error', () => {
    console.log('Server error occurred');
});

server.listen(PORT, () => {
    console.log(`Server launched on the http://localhost:${PORT}`);
});

// ------------------------

// process.stdin.pipe(process.stdout);
// process.stdin.pipe(process.stderr);
// process.stdin.pipe(createWriteStream('public/my-file.txt'));

// process.stdin.on('data', (chunk) => {
//     process.stdout.write(`> ${chunk}`);
// });
