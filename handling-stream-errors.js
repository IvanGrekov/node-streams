import { Server } from 'http';
import { createReadStream } from 'fs';

const server = new Server();

server.on('request', (req, res) => {
    const filename = req.url.slice(1);
    const readFileStream = createReadStream(filename);

    readFileStream.pipe(res);

    readFileStream.on('error', () => {
        res.statusCode = 404;
        res.end('Error');
        console.log(`Stream error occurred by path ${req.url}`);
    });
});

server.on('error', () => {
    console.log('Server error occurres');
});

server.listen(3000, () => {
    console.log('Server launched on http://localhost:3000');
});
