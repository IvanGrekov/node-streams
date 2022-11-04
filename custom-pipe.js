import { Server } from 'http';
import { createReadStream, readFile } from 'fs';

console.clear();

const PORT = 4000;
const server = new Server();

server.on('request', (req, res) => {
    const { url } = req;

    if (url === '/favicon.ico') {
        readFile('favicon.ico', (_, data) => {
            res.end(data);
        });

        return;
    }

    const readStream = createReadStream('public/my-file.txt');

    // readStream.pipe(res);
    readStream.on('data', (chunk) => {
        const canProceed = res.write(chunk);

        if (!canProceed) {
            readStream.pause();

            res.once('drain', () => {
                readStream.resume();
            });
        }
    });

    readStream.on('open', () => {
        console.log('opened');
    });

    readStream.on('end', () => {
        console.log('ended');
        res.end();
    });

    res.on('close', () => {
        readStream.destroy();
    });

    readStream.on('error', (err) => {
        console.log('Error occurred while reading file', err);

        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Ooops, 404 Error</h1>');
    });
});

server.on('error', (err) => {
    console.log('Error occurred on the server', err);
});

server.listen(PORT, () => {
    console.log(`Server launched on http://localhost:${PORT}`);
});
