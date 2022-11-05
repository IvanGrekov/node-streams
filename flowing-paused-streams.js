import { Server } from 'http';
import { readFile, createReadStream } from 'fs';

console.clear();

const PORT = 3000;
const server = new Server();

const return404Error = (res) => {
    res.statusCode = 404;
    res.end('<h1>Ooops, 404 Error</h1>');
};

const return500Error = (res) => {
    res.statusCode = 500;
    res.end('<h1>We are sorry, 500 Error</h1>');
};

server.on('request', (req, res) => {
    if (req.url === '/favicon.ico') {
        readFile('favicon.ico', (err, data) => {
            if (err) {
                console.log('Error while reading favicon', err);
                return404Error(res);

                return;
            } else {
                res.end(data);
            }
        });

        return;
    }

    const readFileStream = createReadStream('public/small-file.txt');
    res.setHeader('Content-Type', 'text/html');

    // NOTE: abilities to set `flowning` status for Read Stream, before that stream is `paused`
    // readFileStream.pipe(res);
    // readFileStream.on('data', (chunk) => {
    //     const canProcceed = res.write(chunk);

    //     if (!canProcceed) {
    //         readFileStream.pause();

    //         res.once('drain', () => {
    //             readFileStream.resume();
    //         });
    //     }
    // });
    // readFileStream.resume();

    // NOTE: abilities to set `pause` status for Read Stream from `flowning`
    // readFileStream.pause();
    // readFileStream.removeAllListeners('data');
    // res.end();

    readFileStream.on('error', (err) => {
        console.log('Error while reading file', err);
        return500Error(res);
    });

    res.on('close', () => {
        readFileStream.destroy();
    });

    req.on('close', () => {
        console.log('Stream closed');
    });

    // readFileStream.on('end', () => {
    //     console.log('Read stream ended');
    //     res.end();
    // });
});

server.on('error', (err) => {
    console.log('Server error', err);
});

server.listen(PORT, () => {
    console.log(`Server launched on http://localhost:${PORT}`);
});
