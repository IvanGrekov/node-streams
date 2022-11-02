import { createReadStream } from 'fs';
import { Duplex, Readable, Transform, Writable } from 'stream';

// ------
// Streams extends EventEmitter
// Stream is like postbox
// By default, buffer is 64 kb
// Res is readable stream

new Readable(); // NOTE: readable stream
new Writable(); // NOTE: writable stream
new Duplex(); // NOTE: this stream can both read and write
new Transform(); // NOTE: duplex stream with ability to modify or transform the data as it is written and read

const PORT = 3000;
const server = new Server();

server.on('request', (req, res) => {
    if (req.url === '/download') {
        const fileStream = createReadStream('./public/lviv.mp4');

        fileStream.on('error', (err) => {
            console.log('Error occurred while reading stream', err);

            res.statusCode = 500;
            res.end('Server error');
        });

        fileStream.on('end', () => {
            console.log('File was read, memory usage:', process.memoryUsage().external);
        });

        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Disposition', 'attachment; filename=lviv.mp4');
        fileStream.pipe(res);
    } else {
        res.end(`
            <a href="/download" target="_blank">
                Download video
            </a>
        `);
    }
});

server.on('error', (err) => {
    console.log('Error occurred', err);
});

server.listen(PORT, () => {
    console.log(`Server launshed on http://localhost:${PORT}`);
});
